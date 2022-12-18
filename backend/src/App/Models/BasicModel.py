class BasicModel:
    def __init__(self, data):
        self.hydrate(data)

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def hydrate(self, data):
        for key, value in self.attributes.items():
            if key in data:
                setattr(self, key, value(data[key]))
            else:
                setattr(self, key, None)
    
    def serialize(self):
        return self.__dict__
