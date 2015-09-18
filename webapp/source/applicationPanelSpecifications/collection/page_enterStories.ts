import kludgeForUseStrict = require("../../kludgeForUseStrict");
"use strict";

var panel: Panel = {
    id: "page_enterStories",
    displayName: "Enter stories",
    panelFields: [
        {
            id: "enterStories_Label",
            valueType: "none",
            displayType: "label",
            displayPrompt: "On this page you can <strong>enter</strong> stories you collected from participants."
        },
        {
            id: "storyCollectionChoice_enterStories",
            valuePath: "/clientState/storyCollectionIdentifier",
            valueType: "string",
            valueOptions: "project_storyCollections",
            valueOptionsSubfield: "storyCollection_shortName",
            displayType: "select",
            displayName: "Story collection",
            displayPrompt: "Choose a <strong>story collection</strong> to add a story to."
        },
        {
            id: "project_enterStories",
            valueType: "none",
            displayType: "button",
            displayConfiguration: "enterSurveyResult",
            displayPrompt: "Add Story..."
        },
        {
            id: "project_csvFileUploaderForStories",
            valueType: "none",
            displayType: "html",
            displayPrompt: "<input type=\"file\" id=\"csvFileLoader\" name=\"files\" title=\"Load File\" style=\"display:none\"/>"
        },
        {
            id: "project_importCSVStories",
            valueType: "none",
            displayType: "button",
            displayConfiguration: "importCSVStories",
            displayPrompt: "Import story data from CSV file into story collection ..."
        },
        {
            id: "project_exportStories",
            valueType: "none",
            displayType: "button",
            displayConfiguration: "exportStoryCollection",
            displayPrompt: "Export story collection..."
        }
    ]
};

export = panel;

