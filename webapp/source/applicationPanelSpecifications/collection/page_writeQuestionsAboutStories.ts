import kludgeForUseStrict = require("../../kludgeForUseStrict");
"use strict";

var panel: Panel = {
    id: "page_writeQuestionsAboutStories",
    displayName: "Write questions about stories",
    tooltipText: "Think of questions you want to ask people about their stories.",
    panelFields: [
        {
            id: "project_storyQuestionsLabel",
            valueType: "none",
            displayType: "label",
            displayPrompt: "On this page you will write questions to ask people <strong>about their stories</strong>."
        },
        {
            id: "project_storyQuestionsList",
            valueType: "array",
            displayType: "grid",
            displayName: "Story questions",
            displayPrompt: "These are the questions you have written so far.",
            displayConfiguration: {
                itemPanelID: "panel_addStoryQuestion",
                gridConfiguration: {
                    columnsToDisplay: ["storyQuestion_text", "storyQuestion_type", "storyQuestion_shortName", "storyQuestion_options"],
                    viewButton: true,
                    editButton: true,
                    addButton: true,
                    removeButton: true, 
                    navigationButtons: true,
               }
            }
        },
        {
            id: "SPECIAL_storyQuestionRecommendations",
            valueType: "none",
            displayType: "recommendationTable",
            displayConfiguration: "storyQuestions",
            displayPrompt: "Recommendations for story questions"
        }
    ]
};

export = panel;

