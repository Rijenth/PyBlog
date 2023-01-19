from src.App.Actions.RelationshipActions import RelationshipActions
from datetime import date
class BasicModel(RelationshipActions):   
    attributes = {}

    serializable = {}

    relationships = []

    hidden = []

    def __init__(self, data):
        if 'id' in data:
            self.hydrate(data, self.serializable.items())
        else:
            self.hydrate(data, self.attributes.items())

    def hydrate(self, data, attributes):
        for key, value in attributes:
            if key in data:
                setattr(self, key, value(data[key]))
            if(key not in data):
                setattr(self, key, None)
        self.missingAttributes(data, attributes)

        # provoque une erreur à cause du type de date
        #self.wrongTypeAttributes(data, attributes)

    def missingAttributes(self, data, attributes):
        if not all(key in data for key, value in attributes):
            missing = [x for x, y in attributes if x not in data]
            raise Exception('Missing attribute(s) : ' + str(missing))

    def wrongTypeAttributes(self, data, attributes):
        for key, value in attributes:
            if key in data and not isinstance(data[key], value):
                raise Exception('Attributes ' + key + ' must be of type ' + str(value.__name__))
            
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
