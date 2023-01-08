from src.App.Actions.RelationshipActions import RelationshipActions
class BasicModel(RelationshipActions):   
    attributes = {}

    serializable = {}

    relationships = []

    def __init__(self, data):
        self.hydrate(data)

    def hydrate(self, data):
        for key, value in self.attributes.items():
            if key in data:
                setattr(self, key, value(data[key]))

    def serialize(self):
        data = {}
        for key in self.serializable:
            if(hasattr(self, key)):
                data[key] = getattr(self, key)
        return data

    def serializeWithRelationships(self):
        data = self.serialize()
        data["relationships"] = {}
        for relationship in self.relationships:
            if(hasattr(self, relationship) and callable(getattr(self, relationship))):
                data["relationships"][relationship] = getattr(self, relationship)()
        return data

