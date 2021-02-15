def control(globals, *argv):
    for func in argv:
        result, error = func(globals)
        if not result:
            return result, error, globals

    return True, "", globals
