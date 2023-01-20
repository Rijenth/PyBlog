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

    def hydrate(self, data, attributes):
        for key, value in attributes:
            if key in data:
                self.setAttributes(data, key, value)
            if(key not in data):
                setattr(self, key, None)
        self.missingAttributes(data, attributes)
        self.wrongTypeAttributes(data, attributes)

    def missingAttributes(self, data, attributes):
        if not all(key in data for key, value in attributes):
            missing = [x for x, y in attributes if x not in data]
            raise Exception('Missing attribute(s) : ' + str(missing))

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
            if relationship == self.table:
                continue
            if(hasattr(self, relationship) and callable(getattr(self, relationship))):
                data["relationships"][relationship] = getattr(self, relationship)()
        return data

    def setAttributes(self, data, key, value):
        if isinstance(data[key], date):
            setattr(self, key, data[key].strftime("%Y-%m-%d"))
        elif isinstance(data[key], datetime):
            setattr(self, key, data[key].strftime("%Y-%m-%d %H:%M:%S"))
        else:
            setattr(self, key, value(data[key]))

    def wrongTypeAttributes(self, data, attributes):
        for key, value in attributes:
            if key in data and not isinstance(data[key], value):
                raise Exception('Attributes ' + key + ' must be of type ' + str(value.__name__))
