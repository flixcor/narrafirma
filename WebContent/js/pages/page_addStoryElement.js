// Generated from design
"use strict";

define([], function() {

    var questions = [
        {"id":"storyElement_name", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"storyElement_type", "type":"select", "isInReport":true, "isGridColumn":true, "options":["character", "situation", "value", "theme", "relationship", "motivation", "belief", "conflict"]},
        {"id":"storyElement_description", "type":"textarea", "isInReport":true, "isGridColumn":true}
    ];

    function buildPage(builder, contentPane, model) {
        builder.addQuestions(questions, contentPane, model);
    }

    return {
        "id": "page_addStoryElement",
        "name": "Add story element",
        "type": "popup",
        "isHeader": false,
        "questions": questions,
        "buildPage": buildPage
    };
});