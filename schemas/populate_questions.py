from typing import Any
import yaml
import csv
from pathlib import Path
from dataclasses import dataclass, fields, asdict


@dataclass
class Question:
    ShortName: str
    Label: str
    Section: int
    Type: str
    Controller: str
    Required: str
    Default: Any
    Placeholder: str
    Prompt: str
    Constraint: str
    Options: str
    Toggle: Any

    def __post_init__(self):
        if isinstance(self.Controller, str):
            self.Controller = self.Controller.lower() == "x"


schema_path = Path("./questions.schema.json")
questions_path = Path("./questions.csv")
main_template_path = Path("./parameters.yaml")
questions_populated_path = Path("./questions_populated.csv")


with questions_path.open() as f:
    questions = [Question(**q) for q in csv.DictReader(f)]

with main_template_path.open() as f:
    template = yaml.safe_load(f)

parameters = template["Parameters"]
labels = template["Metadata"]["AWS::CloudFormation::Interface"]["ParameterLabels"]


for q in questions:
    print(f"Processing {q.Label}")
    param = parameters.get(q.Label)
    if not param:
        continue
    label = labels.get(q.Label, {})
    q.ShortName = q.ShortName or label.get("default")
    q.Constraint = q.Constraint or param.get("AllowedPattern")
    q.Default = q.Default or param.get("Default")
    q.Prompt = q.Prompt or param.get("Description")
    q.Type = q.Type or param.get("Type")
    q.Options = q.Options or ",".join(param.get("AllowedValues", []))

with questions_populated_path.open("w") as f:
    writer = csv.DictWriter(f, fieldnames=[fld.name for fld in fields(Question)])

    writer.writeheader()
    writer.writerows([q.__dict__ for q in questions])
