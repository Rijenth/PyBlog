from src.App.Actions.RelationshipActions import RelationshipActions
class BasicModel(RelationshipActions):   
    attributes = {}

    serializable = {}

    relationships = []

    hidden = []

    def __init__(self, data):
        if 'id' in data:
            self.hydrate(data, "read")
        else:
            self.hydrate(data, "create")

    def hydrate(self, data, operation):
        if operation == "create":
            list = self.attributes.items()
        elif operation == "read":
            list = self.serializable.items()
        for key, value in list:
            if key in data:
                setattr(self, key, value(data[key]))
            
    def serialize(self):
        data = {}
        for key in self.serializable:
            if hasattr(self, key) and key not in self.hidden:
                data[key] = getattr(self, key)
        return data

    def serializeWithRelationships(self):
        data = self.serialize()
        data["relationships"] = {}
        for relationship in self.relationships:
            if(hasattr(self, relationship) and callable(getattr(self, relationship))):
                data["relationships"][relationship] = getattr(self, relationship)()
        return data

