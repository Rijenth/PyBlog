class BasicModel:
    def __init__(self, data):
        self.hydrate(data)

    def hydrate(self, data):
        for key, value in self.attributes.items():
            if key in data:
                setattr(self, key, value(data[key]))
    
