define([
    "dojo/_base/array",
    "dojox/uuid/generateRandomUuid"
], function(
    array,
    generateRandomUuid
){
    "use strict";
    
    /* global m */

    var timestampStart;
    
    // Panel builder needs to be configured further if buttons or grids are used
    // var panelBuilder = new PanelBuilder();
    
    function storeSurveyResult(pointrelClient, projectIdentifier, storyCollectionIdentifier, completedSurvey, wizardPane) {
        var surveyResultWrapper  = {
            projectIdentifier: projectIdentifier,
            storyCollectionIdentifier: storyCollectionIdentifier,
            surveyResult: completedSurvey
        };
        
        pointrelClient.createAndSendChangeMessage("surveyResults", "surveyResult", surveyResultWrapper, null, function(error, result) {
            if (error) {
                console.log("Problem saving survey result", error);
                // TODO: Translate
                // alert("Problem saving survey result");
                alert("Problem saving survey result.\nPlease try to submit the survey result later;\nCould not write new survey result to server:\n" + error);
                return;
            }
            console.log("Survey result stored");
            if (wizardPane) alert("Survey result stored");
            if (wizardPane) wizardPane.forward();
        });
    }
    
    function submitSurvey(surveyResultsWithModels, wizardPane, doneCallback) {
        var answers = {};
        console.log("submitSurvey pressed");
        
        var timestampEnd = new Date();
        
        surveyResultsWithModels.timestampEnd = timestampEnd.toISOString();
        surveyResultsWithModels.timeDuration_ms = timestampEnd.getTime() - timestampStart.getTime(); 
        
        var surveyResult = getPlainValue(surveyResultsWithModels);
           
        console.log("survey answers", surveyResult);
        
        doneCallback("submitted", surveyResult, wizardPane);
    }

   function validateStoryQuestionsModel(storyQuestionsModel, allowEmptyBypass) {
       // TODO: Translate
       var elicitingQuestion = storyQuestionsModel.get("__survey_elicitingQuestion");
       var storyName = storyQuestionsModel.get("__survey_storyName");
       var storyText = storyQuestionsModel.get("__survey_storyText");
       
       // Until support deleting stories, allow progress with out entering anything...
       if (allowEmptyBypass && !storyText && !storyName) {
           // alert("It looks like you don't want to tell a story right now for this page; that's OK");
           return true;
       }
       
       if (!elicitingQuestion) {
           alert("Please select a question before proceeding");
           return false;
       }
       
       var bypassText = "\n(or clear both the story name field and the story response field if you don't want to enter a story on this page)";
       if (!allowEmptyBypass) bypassText = "";
       
       if (!storyText) {
           alert("Please enter some text in the story response field before proceeding" + bypassText);
           return false;
       }
       
       if (!storyName) {
           alert("Please give your story a name before proceeding" + bypassText);
           return false;
       }
       
       return true;
   }
   
   function newStoryEntry(wizardPane, allStoryQuestions, participantID, surveyResultsWithModels, addIndex, singlePrompt) {
        
        var surveyPane = new ContentPane();
        
        // TODO: Translate
        allStoryQuestions[0].displayPrompt = "Story #" + addIndex;
        
        var storyQuestionsModel = new Stateful();
        storyQuestionsModel.set("__type", "org.workingwithstories.Story");
        storyQuestionsModel.set("_storyID", generateRandomUuid());
        storyQuestionsModel.set("_participantID", participantID);
        if (singlePrompt) storyQuestionsModel.set("__survey_elicitingQuestion", singlePrompt);
        surveyResultsWithModels.stories.push(storyQuestionsModel);
        
        panelBuilder.buildFields(allStoryQuestions, surveyPane, storyQuestionsModel);
        
        widgetSupport.newButton(surveyPane, "#button_previousPage|Previous page", function() {
            console.log("button_previousPage");
            wizardPane.back();
        });
        
        var tellAnotherStoryButton = widgetSupport.newButton(surveyPane, "#button_tellAnotherStory|Tell another story", function() {
            console.log("button_tellAnotherStory");
            if (!validateStoryQuestionsModel(storyQuestionsModel)) return;
            var children = wizardPane.getChildren();
            var indexForNewStoryPage = array.indexOf(children, wizardPane.selectedChildWidget) + 1;
            newStoryEntry(wizardPane, allStoryQuestions, participantID, surveyResultsWithModels, indexForNewStoryPage, singlePrompt);
            domStyle.set(tellAnotherStoryButton.domNode, 'display', 'none');
            domStyle.set(dontTellAnotherStoryButton.domNode, 'display', 'none');
            domStyle.set(nextPageButton.domNode, 'display', 'inline');
            wizardPane.forward();
        });
        
        var dontTellAnotherStoryButton = widgetSupport.newButton(surveyPane, "#button_dontTellAnotherStory|Done with adding stories", function() {
            console.log("button_dontTellAnotherStory");
            var canProceedIfNoStory = addIndex !== 1;
            if (!validateStoryQuestionsModel(storyQuestionsModel, canProceedIfNoStory)) return;
            wizardPane.forward();
        });
        
        /*
        widgetSupport.newButton(surveyPane, "#button_deleteThisStory|Delete this story", function() {
            console.log("button_nextPage");
            wizardPane.forward();
        });
        */
        
        var nextPageButton = widgetSupport.newButton(surveyPane, "#button_nextPage|Next page", function() {
            console.log("button_nextPage");
            // TODO: Need to somehow require at least one story... But this allows previous stories to be deleted. Kludge for now that first story can't be blank.
            var canProceedIfNoStory = addIndex !== 1;
            if (!validateStoryQuestionsModel(storyQuestionsModel, canProceedIfNoStory)) return;
            wizardPane.forward();
        });
        domStyle.set(nextPageButton.domNode, 'display', 'none');
        
        wizardPane.addChild(surveyPane, addIndex);
    }
    
    function buildSurveyForm(surveyDiv, questionnaire, doneCallback) {  
        console.log("buildSurveyForm questions", questionnaire);
        
        var startText = questionnaire.startText;
        // TODO: Translate
        if (!startText) startText = 'Please help by taking a short survey. The data you enter will be sent to the server only at the end when you press the "submit survey" button.';
        
        var startQuestions = [];
        if (questionnaire.title) {
            startQuestions.push({id: "__survey-local_" + "title", displayName: "title", displayPrompt: questionnaire.title, displayType: "header", valueOptions:[]});
            document.title = questionnaire.title;
        }
        
        startQuestions.push({id: "__survey-local_" + "startText", displayName: "startText", displayPrompt: startText, displayType: "label", valueOptions:[]});

        var endText = questionnaire.endText;
         // TODO: Translate
        if (!endText) endText = "Thank you for taking the survey.";
            
        var endQuestions = [];
        endQuestions.push({id: "__survey-local_" + "endText", displayName: "endText", displayPrompt: endText, displayType: "label", valueOptions:[]});

        // TODO: What about idea of having IDs that go with eliciting questions so store reference to ID not text prompt?
        var elicitingQuestionPrompts = [];
        for (var elicitingQuestionIndex in questionnaire.elicitingQuestions) {
            var elicitingQuestionSpecification = questionnaire.elicitingQuestions[elicitingQuestionIndex];
            elicitingQuestionPrompts.push(elicitingQuestionSpecification.text);
        }
        
        // TODO: What if these IDs for storyText and storyName are not unique?
        var initialStoryQuestions = [];
        var singlePrompt = null;
        initialStoryQuestions.push({id: "__survey_" + "questionHeader", displayName: "questionHeader", displayPrompt: "Story", displayType: "header", valueOptions: []});
        if (elicitingQuestionPrompts.length !== 1) {
            initialStoryQuestions.push({id: "__survey_" + "elicitingQuestion", displayName: "elicitingQuestion", displayPrompt: "Please choose a question to which you would like to respond:", displayType: "radiobuttons", valueOptions: elicitingQuestionPrompts});
            initialStoryQuestions.push({id: "__survey_" + "storyText", displayName: "storyText", displayPrompt: "Please enter your response in the box below:", displayType: "textarea", valueOptions:[]});
        } else {
            singlePrompt = elicitingQuestionPrompts[0];
            initialStoryQuestions.push({id: "__survey_" + "storyText", displayName: "storyText", displayPrompt: singlePrompt, displayType: "textarea", valueOptions:[]});
        }
        initialStoryQuestions.push({id: "__survey_" + "storyName", displayName: "storyName", displayPrompt: "Please give your story a name", displayType: "text", valueOptions:[]});
        
        var allStoryQuestions = initialStoryQuestions.concat(questionnaire.storyQuestions);
        
        questionnaire.participantQuestions.unshift({id: "__survey_" + "participantHeader", displayName: "participantHeader", displayPrompt: "About you", displayType: "header", valueOptions: []});
        
        //var form = new Form();
        //form.set("style", "width: 800px; height 800px; overflow: auto;");
        
        timestampStart = new Date();
        
        var surveyResultsWithModels = {
            __type: "org.workingwithstories.QuestionnaireResponse",
            // TODO: Think about whether to include entire questionnaire or something else perhaps
            questionnaire: questionnaire,
            responseID: generateRandomUuid(),
            stories: [],
            participantData: null,
            timestampStart: "" + timestampStart.toISOString()
        };
        
        var participantID = generateRandomUuid();
        var participantDataModel = {
            __type: "org.workingwithstories.ParticipantData",
            _participantID: participantID
        };
        
        surveyResultsWithModels.participantData = participantDataModel;

        // m.render(surveyDiv, m("div", ["Hello survey ============== b", "More!!"]));
        
        console.log("startQuestions", startQuestions);
        
        function displayQuestion(question) {
            var displayType = question.displayType;
            if (displayType === "label") {
                return question.displayPrompt;
            } else if (displayType === "header") {
                return m("span", {style: {"font-weight": "bold"}}, question.displayPrompt);
            } else {
                return "UNFINISHED: " + question.displayType;
            }
        }
        
        var view = function() {
            return m("div", [
                startQuestions.map(function(question, index) {
                    console.log("question", question);
                    return m("div", [displayQuestion(question), m("br"), m("br")]);
                }),
                m("button", "Submit survey"),
            ]);
        };
        
        m.render(surveyDiv, view());
        
        /*
        var startPane = new ContentPane();
        
        panelBuilder.buildFields(startQuestions, startPane, participantDataModel);
        
        widgetSupport.newButton(startPane, "button_nextPage", function() {
            console.log("button_nextPage");
            wizardPane.forward();
        });
        
        wizardPane.addChild(startPane);
        
        // TODO: Need to handle multiple stories somehow
        
        newStoryEntry(wizardPane, allStoryQuestions, participantID, surveyResultsWithModels, 1, singlePrompt) ;
        //newStoryEntry(wizardPane, allStoryQuestions, participantID, surveyResultsWithModels) ;
        //newStoryEntry(wizardPane, allStoryQuestions, participantID, surveyResultsWithModels) ;
        //newStoryEntry(wizardPane, allStoryQuestions, participantID, surveyResultsWithModels) ;
        
        var participantPane = new ContentPane();
        
        panelBuilder.buildFields(questionnaire.participantQuestions, participantPane, participantDataModel);
        
        widgetSupport.newButton(participantPane, "#button_previousPage|Previous page", function() {
            console.log("button_previousPage");
            wizardPane.back();
        });
        
        widgetSupport.newButton(participantPane, "#surveySubmit|Submit survey", function() {
            console.log("Submit survey");
            submitSurvey(surveyResultsWithModels, wizardPane, doneCallback);
        });
        
        wizardPane.addChild(participantPane);
        
        var endPane = new ContentPane();
        panelBuilder.buildFields(endQuestions, endPane, participantDataModel);
        
        wizardPane.addChild(endPane);
        
        return wizardPane;
        */
    }

    // Caller should call wizard.forward() on successful save to see the last page, and provide a retry message otherwise
    // Caller may also want to call (the returned) surveyDialog.hide() to close the window, or let the user do it.
    function openSurveyDialog(questionnaire, callback) {  
        console.log("openSurveyDialog questionnaire", questionnaire);
        
        var surveyDialog;
        var form;
        
        form = buildSurveyForm(questionnaire, callback);
   
        surveyDialog = new Dialog({
            title: "Take Survey",
            content: form
            // style: "width: 800px; height: 700px;"
        });
        
        // This will free the dialog when it is closed to avoid a memory leak
        surveyDialog.connect(surveyDialog, "onHide", function(e) {
            console.log("destroying surveyDialog");
            surveyDialog.destroyRecursive();
        });
                
        surveyDialog.show();
        
        return surveyDialog;
    }

    return {
        openSurveyDialog: openSurveyDialog,
        buildSurveyForm: buildSurveyForm,
        storeSurveyResult: storeSurveyResult
    };
});