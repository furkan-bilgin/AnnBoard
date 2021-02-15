from .base import *
from .purgers import *

_purgers = [ FlaskCachePurger(), CloudflareCachePurger() ]

class PurgeRedirector:
    def __getattr__(self, item):
        def func(*argv):
            for x in _purgers:
                getattr(x, item)(*argv)

        return func

purger = PurgeRedirector()