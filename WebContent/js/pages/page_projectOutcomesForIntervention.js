// Generated from design
"use strict";

define([
    "../widgetBuilder"
], function(
    widgets
) {

    var questions = [
        {"id":"outcomesTable", "type":"questionsTable", "isInReport":true, "isGridColumn":false, "options":["page_outcomesTable", "participants_firstGroupName", "participants_secondGroupName", "participants_thirdGroupName"]}
    ];

    function addWidgets(contentPane, model) {
        widgets.addQuestionWidgets(questions, contentPane, model);
    }

    return {
        "id": "page_projectOutcomesForIntervention",
        "name": "Answer questions about project outcomes",
        "type": "page",
        "isHeader": false,
        "questions": questions,
        "addWidgets": addWidgets
    };
});