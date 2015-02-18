// Generated from design
define([], function() {
    "use strict";
    
    var questions = [
        {"id":"project_projectStoriesList", "type":"grid", "isInReport":true, "isGridColumn":true, "options":["page_projectStory"]}
    ];
    
    function buildPage(builder, contentPane, model) {
        builder.addQuestions(questions, contentPane, model);
    }

    return {
        "id": "page_projectStories",
        "type": "page",
        "isHeader": false,
        "questions": questions,
        "buildPage": buildPage
    };
});