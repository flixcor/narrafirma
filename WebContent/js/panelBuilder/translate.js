define([
], function(
) {
    "use strict";
    
    // Messages used by pages and created from design
    var pageMessages = {};
    
    // Messages specific to the editing application
    var applicationMessages = {};
    
    // Dynamically added extra translations like for survey questions
    var extraTranslations = {};
    
    var debugTranslations = false;
    
    // the tag field should have a leading "#" to ensure translation lookup, otherwise it is just returned as the same string passed in
    function translate(tag, defaultText) {
        if (debugTranslations) console.log("translating", tag);
        if (tag === "#undefined::prompt") throw new Error("bad translation tag using undefined which is likely a programming error");
        // if (debugTranslations && tag.charAt(0) !== "#") throw new Error("translation tag should have leading #  for: " + tag);
        // Kludge for extra domain translations for testing
        if (!tag) {
            if (debugTranslations) console.log("translating with no tag, so returning defaultText or empty string", defaultText);
            return defaultText || "";
        }
        if (tag.charAt(0) !== "#") {
            if (debugTranslations) console.log("translating with no leading hash mark, so returning what was passed in", tag);
            return tag;
        }
        var id = tag.substring(1);
        var suppliedText = "";
        /* Was thinking about supporting extra text at end, but seems not to work with spaces -- too common; could try pipe ("|")?
        var splitPoint = id.indexOf(" ");
        if (splitPoint !== -1) {
            suppliedText = id.substring(splitPoint + 1);
            id = id.substring(0, splitPoint);
        }
        */
        var result = pageMessages[id] || applicationMessages[id] || extraTranslations[id];
        if (result === undefined) {
            if (suppliedText) {
                result = suppliedText;
            } else if (typeof defaultText !== 'undefined') {
                result = defaultText;
            } else {
                // Just return the tag, which starts with a # which should indicate an issue
                result = "ERROR: missing text for: " + tag;
                console.log("translate problem", result);
                if (!debugTranslations) result = tag;
            }
        }
        if (debugTranslations) console.log("translating result: ", result, tag);
        return result;
    }
    
    function configure(pageMessagesNew, applicationMessagesNew) {
        pageMessages = pageMessagesNew;
        applicationMessages = applicationMessagesNew;
    }
    
    function addExtraTranslationsForQuestion(question) {
        // console.log("addExtraTranslationsForQuestion", question);
        if (!question) throw new Error("question is null or undefined");
        if (debugTranslations) console.log("adding extra translations for", question.id, question);
        extraTranslations[question.id + "::prompt"] = question.displayPrompt;
        extraTranslations[question.id + "::shortName"] = question.shortName;
        for (var optionIndex in question.dataOptions) {
            var option = question.dataOptions[optionIndex];
            extraTranslations[question.id + "::selection:" + option] = option;
        }
    }
    
    function addExtraTranslationsForQuestions(questions) {
        // console.log("addExtraTranslationsForQuestions", questions);
        if (!questions) {
            throw new Error("questions should not be undefined!");
        }
        for (var questionIndex = 0; questionIndex < questions.length; questionIndex++) {
            var question = questions[questionIndex];
            if (!question) throw new Error("question could not be found for: " + questionIndex + " in: " + JSON.stringify(questions));
            addExtraTranslationsForQuestion(question);
        }
    }
    
    function addExtraTranslation(id, text) {
        extraTranslations[id] = text;
    }
    
    // Adding these to function just so can keep previous code the same as direct call to translate module
    translate.configure = configure;
    translate.addExtraTranslation = addExtraTranslation;
    translate.addExtraTranslationsForQuestion = addExtraTranslationsForQuestion;
    translate.addExtraTranslationsForQuestions = addExtraTranslationsForQuestions;
    
    return translate;
});