import kludgeForUseStrict = require("../../kludgeForUseStrict");
"use strict";

var panel: Panel = {
    id: "panel_addResonantStory",
    displayName: "Add resonant story",
    displayType: "panel",
    section: "sensemaking",
    modelClass: "ResonantStory",
    panelFields: [
        {
            id: "sensemakingSessionRecord_resonantStory_name",
            valueType: "string",
            displayType: "text",
            displayName: "Name",
            displayPrompt: "What is the <strong>name</strong> of the resonant story?"
        },
        {
            id: "sensemakingSessionRecord_resonantStory_type",
            valueType: "string",
            valueOptions: [
                "pivot",
                "voice",
                "discovery",
                "other"
            ],
            required: true,
            displayType: "select",
            displayName: "Type",
            displayPrompt: "Which <strong>type</strong> of resonant story is this?"
        },
        {
            id: "sensemakingSessionRecord_resonantStory_text",
            valueType: "string",
            required: true,
            displayType: "textarea",
            displayName: "Story text",
            displayPrompt: "You can type (or paste) the story <strong>text</strong> (or description) here."
        },
        {
            id: "sensemakingSessionRecord_resonantStory_reason",
            valueType: "string",
            required: true,
            displayType: "textarea",
            displayName: "Why",
            displayPrompt: "Why did this story <strong>stand out</strong>?"
        },
        {
            id: "sensemakingSessionRecord_resonantStory_groups",
            valueType: "string",
            required: true,
            displayType: "text",
            displayName: "Groups",
            displayPrompt: "For which participant <strong>group</strong>  (or groups) was this story important?"
        },
        {
            id: "sensemakingSessionRecord_resonantStory_notes",
            valueType: "string",
            displayType: "textarea",
            displayName: "Notes",
            displayPrompt: "You can enter any other <strong>notes</strong> about this story here."
        }
    ]
};

export = panel;
