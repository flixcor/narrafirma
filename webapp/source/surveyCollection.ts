import Project = require("./Project");
import questionnaireGeneration = require("./questionnaireGeneration");
import translate = require("./panelBuilder/translate");

"use strict";
    
var project: Project;

export function setProject(theProject) {
    project = theProject;
}

// TODO: Just for testing!!!
var TestDataToRemove = {};

function getStoryField(storyID, fieldName, defaultValue) {
    var extra = TestDataToRemove[storyID] || {};
    var result = extra[fieldName];
    if (result === undefined) result = defaultValue;
    return result;
}

function setStoryField(storyID, fieldName, value) {
    var extra = TestDataToRemove[storyID] || {};
    extra[fieldName] = value;
    TestDataToRemove[storyID] = extra;
    return value;
}

// A Story class where data can be overriden
export class Story {
    constructor(public model) {
    }
    
    storyID() {
        return this.model.storyID;
    }
    
    ignore(): boolean {
        return getStoryField(this.model.storyID, "ignore", "").trim() !== "";
    }
     
    questionnaire() {
        return this.model.questionnaire;
    }
    
    storyText() {
        return getStoryField(this.model.storyID, "storyText", this.model.storyText);
    }
    
    storyName() {
        return getStoryField(this.model.storyID, "storyName", this.model.storyName);
    }
    
    elicitingQuestion() {
        return getStoryField(this.model.storyID, "elicitingQuestion", this.model.elicitingQuestion);
    }
    
    answer(questionIdentifier, newValue = undefined) {
        if (newValue === undefined) {
            return getStoryField(this.model.storyID, questionIdentifier, this.model[questionIdentifier]) || "";
        } else {
            return setStoryField(this.model.storyID, questionIdentifier, newValue);
        }
    }
}

export function getStoriesForStoryCollection(storyCollectionIdentifier, includeIgnored = false): Story[] {
    var result = [];
    var surveyMessages = project.pointrelClient.filterMessages(function (message) {
        var match = (message._topicIdentifier === "surveyResults" &&
            message.messageType === "surveyResult" &&
            message.change.projectIdentifier === project.projectIdentifier &&
            message.change.storyCollectionIdentifier === storyCollectionIdentifier);
        // console.log("message", match, message);
        return match;
    });
    // console.log("getStoriesForStoryCollection surveyMessages", surveyMessages);
    
    surveyMessages.forEach(function (message) {
        // Now add stories in survey to results, with extra participant information
        try {
            var surveyResult = message.change.surveyResult;
            var stories = surveyResult.stories;
            for (var storyIndex in stories) {
                var story = stories[storyIndex];
                // console.log("=== story", story);
                
                // Add participant info for story
                var participantData = surveyResult.participantData;
                for (var key in participantData) {
                    if (key !== "__type") {
                        story[key] = participantData[key];
                    }
                }
                
                // Add questionnaire for display
                story.questionnaire = surveyResult.questionnaire;
                var wrappedStory = new Story(story);
                if (includeIgnored || !wrappedStory.ignore()) { 
                    result.push(wrappedStory);
                }
            }
        } catch (e) {
            console.log("Problem processing survey result", message, e);
        }
    });
    
    return result;
}

// TODO: Similar to function in buttonActions except no alerts
export function getQuestionnaireForStoryCollection(storyCollectionIdentifier) {
    var storyCollection = questionnaireGeneration.findStoryCollection(project, storyCollectionIdentifier);
    if (!storyCollection) return null;
    
    var questionnaireName = project.tripleStore.queryLatestC(storyCollection, "storyCollection_questionnaireIdentifier");
    if (!questionnaireName) return null;

    var questionnaire = project.tripleStore.queryLatestC(storyCollection, "questionnaire");
    return questionnaire;
}

function urlForSurvey(storyCollectionName) {
    var href = window.location.href;
    var baseURL = href.substring(0, href.lastIndexOf("/"));
    // TODO: Duplicated project prefix; should refactor to have it in one place
    var projectName = project.journalIdentifier.substring("NarraFirmaProject-".length);
    return baseURL + "/survey.html#project=" + projectName + "&survey=" + storyCollectionName;
}

export function toggleWebActivationOfSurvey(model: string, fieldSpecification, value) {
    // TODO: Fix this for mover to using triples for projectModel
    var grid = fieldSpecification.grid;
    var selectedItem: string = grid.getSelectedItem();
    console.log("toggleWebActivationOfSurvey selectedItem", selectedItem, model, fieldSpecification); 
    
    var shortName = project.tripleStore.queryLatestC(selectedItem, "storyCollection_shortName");
    var activeOnWeb = project.tripleStore.queryLatestC(selectedItem, "storyCollection_activeOnWeb");
    activeOnWeb = !activeOnWeb;
    if (activeOnWeb) {
        project.tripleStore.addTriple(selectedItem, "storyCollection_activeOnWeb", urlForSurvey(shortName));
    } else {
        project.tripleStore.addTriple(selectedItem, "storyCollection_activeOnWeb", "");
    }
    
    // TODO: Potential window of vulnerability here because not making both changes (to item and survey questionnaires) as a single transaction
    
    var questionnaires = {};
    for (var key in project.activeQuestionnaires) {
        questionnaires[key] = project.activeQuestionnaires[key];
    }
   
    var questionnaire = project.tripleStore.queryLatestC(selectedItem, "questionnaire");
    if (!questionnaire) {
        var questionnaireName = project.tripleStore.queryLatestC(selectedItem, "storyCollection_questionnaireIdentifier");
        console.log("Could not find questionnnaire for", questionnaireName);
        return;
    }
    if (activeOnWeb) {
        questionnaires[shortName] = questionnaire;
    } else {
       delete questionnaires[shortName];
    }

    // Now publish the new or removed questionnaire so surveys can pick up the change...
    updateActiveQuestionnaires(questionnaires, "sendMessage");
}
   
export function updateActiveQuestionnaires(questionnaires, sendMessage) {
    project.activeQuestionnaires = questionnaires;
   
    if (!sendMessage) return;
   
    // TODO: Should not have GUI actions in here like alert; either do as Toast or publish on topic that can be hooked up to alert or Toast
    project.pointrelClient.createAndSendChangeMessage("questionnaires", "questionnairesMessage", questionnaires, null, function(error, result) {
       if (error) {
           // TODO: Translate
           alert("Problem activating or deactivating web form");
           return;
       }
       // TODO: Translate
       alert("The web form has been activated or deactivated.");
    });
}
   
export function storyCollectionStop() {
    // TODO: translate
    // TODO: probably should not have GUI action in here; need to rethink?
    if (!isStoryCollectingEnabled()) {
        alert("Story collection via the web is already not currently enabled.");
        return;
    }
    if (!confirm("Deactivate all story collection via the web?")) return;
    var storyCollections = project.getListForField("project_storyCollections");
    for (var i = 0; i < storyCollections.length; i++) {
        var storyCollectionIdentifier = storyCollections[i];
        if (project.tripleStore.queryLatestC(storyCollectionIdentifier, "storyCollection_activeOnWeb")) {
            project.tripleStore.addTriple(storyCollectionIdentifier, "storyCollection_activeOnWeb", "");
        }
    }

    updateActiveQuestionnaires({}, "sendMessage");
    console.log("Deactivated all web questionnaires");
}
   
export function isStoryCollectingEnabled() {
    for (var key in project.activeQuestionnaires) {
        return true;
    }
    return false;
}
   
export function collectQuestionsForQuestionnaire(questionnaire) {
    // console.log("collectQuestionsForQuestionnaire", questionnaire);
   
    if (!questionnaire) return [];
   
    var storyQuestions = questionnaire.storyQuestions;
   
    // TODO: What about idea of having IDs that go with eliciting questions so store reference to ID not text prompt?
    var elicitingQuestionValues = [];
    for (var elicitingQuestionIndex = 0; elicitingQuestionIndex < questionnaire.elicitingQuestions.length; elicitingQuestionIndex++) {
        var elicitingQuestionSpecification = questionnaire.elicitingQuestions[elicitingQuestionIndex];
        // elicitingQuestionValues.push({value: elicitingQuestionSpecification.id, text: elicitingQuestionSpecification.label});
        elicitingQuestionValues.push(elicitingQuestionSpecification.id || elicitingQuestionSpecification.shortName || elicitingQuestionSpecification.text);
    }
   
    // TODO: Remove redundancy
    var leadingStoryQuestions = [];
    leadingStoryQuestions.unshift({
        id: "storyName",
        displayName: "Story Name",
        displayPrompt: "Please give your story a name",
        displayType: "text",
        valueOptions: []
    });
    leadingStoryQuestions.unshift({
        id: "storyText",
        displayName: "Story Text",
        displayPrompt: "Please enter your response to the question above in the space below",
        displayType: "textarea",
        valueOptions: []
    });
    leadingStoryQuestions.unshift({
        id: "elicitingQuestion",
        displayName: "Eliciting Question",
        displayPrompt: "Please choose a question you would like to respond to",
        displayType: "select",
        valueOptions: elicitingQuestionValues
    });

    // console.log("DEBUG questions used by story browser", questions);
          
    var questions = [].concat(leadingStoryQuestions, storyQuestions);
    questions.push({
        id: "participantData_header",
        displayName: "Participant Data",
        displayPrompt: "---- participant data below ----",
        displayType: "header",
        valueOptions: []
    });

    // TODO: add more participant and survey info, like timestamps and participant ID
   
    // Participant data has elsewhere been copied into story, so these questions can access it directly
    questions = questions.concat(questionnaire.participantQuestions);
   
    return questions;
}
   
// Types of questions that have data associated with them for filters and graphs
var filterableQuestionTypes = ["select", "slider", "boolean", "text", "checkbox", "checkboxes", "radiobuttons"];

// function updateFilterPaneForCurrentQuestions(questions) {
export function optionsForAllQuestions(questions, excludeTextQuestionsFlag = null) {
    var questionOptions = [];
    questions.forEach(function (question) {
        if (filterableQuestionTypes.indexOf(question.displayType) !== -1) {
            if (!excludeTextQuestionsFlag || question.displayType !== "text") {
                var defaultText = question.displayName;
                if (!defaultText) defaultText = question.displayPrompt;
                questionOptions.push({label: translate(question.id + "::shortName", defaultText), value: question.id});
            }
        }
    });
    return questionOptions;
}
