// Generated from design
"use strict";

define([
    "../widgetBuilder"
], function(
    widgets
) {

    var questions = [
        {"id":"elicitingQuestion_text", "type":"textarea", "isInReport":true, "isGridColumn":true},
        {"id":"elicitingQuestion_type", "type":"checkBoxes", "isInReport":true, "isGridColumn":true, "options":["what happened", "directed question", "undirected questions", "point in time", "event", "extreme", "surprise", "people, places, things", "fictional scenario", "other"]},
        {"id":"templates_elicitingQuestions", "type":"templateList", "isInReport":true, "isGridColumn":false, "options":["elicitingQuestions"]},
        {"id":"templates_elicitingQuestions_unfinished", "type":"label", "isInReport":false, "isGridColumn":false}
    ];

    function addWidgets(contentPane, model) {
        widgets.addQuestionWidgets(questions, contentPane, model);
    }

    return {
        "id": "page_addElicitingQuestion",
        "name": "Add story eliciting question",
        "type": "popup",
        "isHeader": false,
        "questions": questions,
        "addWidgets": addWidgets
    };
});