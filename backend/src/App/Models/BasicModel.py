from src.App.Actions.RelationshipActions import RelationshipActions
from datetime import date, datetime
class BasicModel(RelationshipActions): 
    
    #
    # `attributes` is used when creating a new model
    #   
    attributes = {}

    #
    # `serializable` are the columns that will be returned by the API
    #
    serializable = {}

    #
    # `relationships` are the relationships of this model that will be returned by the API
    #
    relationships = []

    #
    # `hidden` are the attributes that will not be returned by the API
    #
    hidden = []
    
    def __init__(self, data):
        if 'id' in data:
            self.hydrate(data, self.serializable.items())
        else:
            self.hydrate(data, self.attributes.items())

    def getAttributes(self, key):
        if isinstance(getattr(self, key), date):
            return getattr(self, key).strftime('%Y-%m-%d')
        elif isinstance(getattr(self, key), datetime):
            return getattr(self, key).strftime('%Y-%m-%d %H:%M:%S')
        return getattr(self, key)

    def hydrate(self, data, attributes):
        self.missingAttributes(data, attributes)
        for attribut, type in attributes:            
            if attribut in data:
                self.setAttributes(data, attribut, type)       

    def missingAttributes(self, data, attributes):
        if not all(key in data for key, value in attributes):
            missing = [x for x, y in attributes if x not in data]
            raise AttributeError('Missing attribute(s) : ' + str(missing))

    def serialize(self):
        data = {}
        for key in self.serializable:
            if hasattr(self, key) and key not in self.hidden:
                data[key] = self.getAttributes(key)
        return data

    def serializeWithRelationships(self):
        data = self.serialize()
        data["relationships"] = {}
        for relationship in self.relationships:
            if(hasattr(self, relationship) and callable(getattr(self, relationship))):
                data["relationships"][relationship] = getattr(self, relationship)()
        return data

    def setAttributes(self, data, attribut, type):
        if type is bool and data[attribut] in (0, 1):
            setattr(self, attribut, bool(data[attribut]))
        else:
            setattr(self, attribut, data[attribut])
        if not isinstance(getattr(self, attribut), type):
            raise TypeError('Attribute ' + attribut + ' must be of type : ' + str(type.__name__))
