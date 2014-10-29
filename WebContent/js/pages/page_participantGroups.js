// Generated from design
"use strict";

define([], function() {

    var questions = [
        {"id":"aboutParticipantGroups", "type":"label", "isInReport":false, "isGridColumn":false},
        {"id":"project_participantGroupsList", "type":"grid", "isInReport":true, "isGridColumn":false, "options":["page_addParticipantGroup"]}
    ];

    function buildPage(builder, contentPane, model) {
        builder.addQuestions(questions, contentPane, model);
    }

    return {
        "id": "page_participantGroups",
        "name": "Describe participant groups",
        "type": "page",
        "isHeader": false,
        "questions": questions,
        "buildPage": buildPage
    };
});