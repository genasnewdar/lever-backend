// SYSTEM
export const ADMIN_API_KEY = "2E7afi532VfQ9fWyDH1RlPMl"


// ========== QUESTION TYPES ========== //

export const QUESTIONS_TYPES = {
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
    FILL_BLANK: "FILL_BLANK",
    COMBINATION: "COMBINATION"
}

export const QUESTION_TYPE_OPTIONS = [
    QUESTIONS_TYPES.MULTIPLE_CHOICE,
    QUESTIONS_TYPES.FILL_BLANK,
    QUESTIONS_TYPES.COMBINATION
]


// ========== SUBJECTS ========== //

export const SUBJECTS = {
    ENGLISH: "ENGLISH",
    MATH: "MATH"
}

export const SUBJECT_OPTIONS = [
    SUBJECTS.ENGLISH,
    SUBJECTS.MATH
]

// ========== LEVELS ========== //

export const LEVELS = {
    A1: "A1",
    A2: "A2",
    B1: "B1",
    B2: "B2",
    C1: "C1",
    C2: "C2",
    ADMISSION: "ADMISSION"
}

export const LEVEL_OPTIONS = [
    LEVELS.A1,
    LEVELS.A2,
    LEVELS.B1,
    LEVELS.B2,
    LEVELS.C1,
    LEVELS.C2,
    LEVELS.ADMISSION
]

// ========== ENGLISH TOPICS ========== //

export const ENGLISH_TOPICS = {
    PRONOUNS: "PRONOUNS",
    ARTICLES: "ARTICLES",
    COUNTABLE: "COUNTABLE",
    UNCOUNTABLE: "UNCOUNTABLE",
    PRESENT_SIMPLE_POSITIVE: "PRESENT_SIMPLE_POSITIVE",
    PRESENT_SIMPLE_NEGATIVE: "PRESENT_SIMPLE_NEGATIVE",
    PRESENT_SIMPLE_QUESTION: "PRESENT_SIMPLE_QUESTION",
    PRESENT_CONTINUOUS_POSITIVE: "PRESENT_CONTINUOUS_POSITIVE",
    PRESENT_CONTINUOUS_NEGATIVE: "PRESENT_CONTINUOUS_NEGATIVE",
    PRESENT_CONTINUOUS_QUESTION: "PRESENT_CONTINUOUS_QUESTION",
    DETERMINERS: "DETERMINERS",
    SENTENCE_STRUCTURE__MAKE_SOMEONE_ADJ: "SENTENCE_STRUCTURE__MAKE_SOMEONE_ADJ",
    COMPARATIVES: "COMPARATIVES",
    SUPERLATIVES: "SUPERLATIVES",
    PAST_SIMPLE_POSITIVE: "PAST_SIMPLE_POSITIVE",
    PAST_SIMPLE_NEGATIVE: "PAST_SIMPLE_NEGATIVE",
    PAST_SIMPLE_QUESTION: "PAST_SIMPLE_QUESTION",
    PAST_CONTINUOUS_POSITIVE: "PAST_CONTINUOUS_POSITIVE",
    PAST_CONTINUOUS_NEGATIVE: "PAST_CONTINUOUS_NEGATIVE",
    PAST_CONTINUOUS_QUESTION: "PAST_CONTINUOUS_QUESTION",
    IRREGULAR_PAST_TENSE: "IRREGULAR_PAST_TENSE",
    PAST_PERFECT: "PAST_PERFECT",
    PRESENT_PERFECT: "PRESENT_PERFECT",
    FUTURE_TENSE: "FUTURE_TENSE",
    VOCAB: "VOCAB",

    GERUND_INFINITIVES: "GERUND_INFINITIVES",
    RELATIVE_CLAUSE: "RELATIVE_CLAUSE",
    CONDITIONAL: "CONDITIONAL",
    USED_TO: "USED_TO",
    REPORTED_SPEECH: "REPORTED_SPEECH",
    PASSIVE: "PASSIVE",
    PAST_PASSIVE: "PAST_PASSIVE",
    ADJECTIVE_ORDER: "ADJECTIVE_ORDER",
    CONVERSATION: "CONVERSATION",
    READING: "READING"
}

export const ENGLISH_TOPIC_OPTIONS = [
    ENGLISH_TOPICS.PRONOUNS,
    ENGLISH_TOPICS.ARTICLES,
    ENGLISH_TOPICS.COUNTABLE,
    ENGLISH_TOPICS.UNCOUNTABLE,
    ENGLISH_TOPICS.PRESENT_SIMPLE_POSITIVE,
    ENGLISH_TOPICS.PRESENT_SIMPLE_NEGATIVE,
    ENGLISH_TOPICS.PRESENT_SIMPLE_QUESTION,
    ENGLISH_TOPICS.PRESENT_CONTINUOUS_POSITIVE,
    ENGLISH_TOPICS.PRESENT_CONTINUOUS_NEGATIVE,
    ENGLISH_TOPICS.PRESENT_CONTINUOUS_QUESTION,
    ENGLISH_TOPICS.DETERMINERS,
    ENGLISH_TOPICS.SENTENCE_STRUCTURE__MAKE_SOMEONE_ADJ,
    ENGLISH_TOPICS.COMPARATIVES,
    ENGLISH_TOPICS.SUPERLATIVES,
    ENGLISH_TOPICS.PAST_SIMPLE_POSITIVE,
    ENGLISH_TOPICS.PAST_SIMPLE_NEGATIVE,
    ENGLISH_TOPICS.PAST_SIMPLE_QUESTION,
    ENGLISH_TOPICS.PAST_CONTINUOUS_POSITIVE,
    ENGLISH_TOPICS.PAST_CONTINUOUS_NEGATIVE,
    ENGLISH_TOPICS.PAST_CONTINUOUS_QUESTION,
    ENGLISH_TOPICS.IRREGULAR_PAST_TENSE,
    ENGLISH_TOPICS.PAST_PERFECT,
    ENGLISH_TOPICS.PRESENT_PERFECT,
    ENGLISH_TOPICS.FUTURE_TENSE,
    ENGLISH_TOPICS.VOCAB,

    ENGLISH_TOPICS.GERUND_INFINITIVES,
    ENGLISH_TOPICS.RELATIVE_CLAUSE,
    ENGLISH_TOPICS.CONDITIONAL,
    ENGLISH_TOPICS.USED_TO,
    ENGLISH_TOPICS.REPORTED_SPEECH,
    ENGLISH_TOPICS.PASSIVE,
    ENGLISH_TOPICS.PAST_PASSIVE,
    ENGLISH_TOPICS.ADJECTIVE_ORDER,
    ENGLISH_TOPICS.CONVERSATION,
    ENGLISH_TOPICS.READING
]


// ========== GENERAL ACADENIC EXAMINATION ========== //

export const ENGLISH_TEST_FORMAT_A1 = {
    PRONOUNS: 2,
    ARTICLES: 2,
    COUNTABLE: 2,
    UNCOUNTABLE: 2,


    PRESENT_SIMPLE_POSITIVE: 1,
    PRESENT_SIMPLE_NEGATIVE: 1,
    PRESENT_SIMPLE_QUESTION: 1,
    PRESENT_CONTINUOUS_POSITIVE: 1,
    PRESENT_CONTINUOUS_NEGATIVE: 1,
    PRESENT_CONTINUOUS_QUESTION: 1,


    DETERMINERS: 2,
    SENTENCE_STRUCTURE__MAKE_SOMEONE_ADJ: 2,
    COMPARATIVES: 2,
    SUPERLATIVES: 2,


    PAST_SIMPLE_POSITIVE: 1,
    PAST_SIMPLE_NEGATIVE: 1,
    PAST_SIMPLE_QUESTION: 1,
    PAST_CONTINUOUS_POSITIVE: 1,
    PAST_CONTINUOUS_NEGATIVE: 1,
    PAST_CONTINUOUS_QUESTION: 1,


    IRREGULAR_PAST_TENSE: 2,
    PRESENT_PERFECT: 2,
    FUTURE_TENSE: 2,
    VOCAB: 6
}

export const ENGLISH_TEST_FORMAT_OPTIONS = [
    ENGLISH_TEST_FORMAT_A1
]

export const ENGLISH_TEST_LEVEL_FORMAT_MAPPING = {
    "A1": ENGLISH_TEST_FORMAT_A1
}