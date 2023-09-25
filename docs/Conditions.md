# Conditions

Conditions are used to determine which forms should be displayed within a section. A condition is an object with a `question`, `is`, and `to` fields. The `question` field represents the question to compare against, represented as a string of format `{sectionid}.{questionid}`. The `is` field must be a valid operator. Currently there is only one general standard valid operator, `==`, which works for `radio` and `text` questions. The `to` field provides a string value to compare against.

## _SELECT

The AST configurator has a `select` screen where the user can select software based on their answers to the previous group. Conditions use `_SELECT` as their `question` and use the operators `includes` and `excludes` to see if certain software ID's were selected or not.
