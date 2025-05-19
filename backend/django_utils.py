from urllib.parse import parse_qsl as urllib_parse_qsl
import re

def parse_qsl(qs, keep_blank_values=False, strict_parsing=False):
    """
    Compatibility function for parse_qsl
    """
    return urllib_parse_qsl(qs, keep_blank_values=keep_blank_values, strict_parsing=strict_parsing)

def parse_header_parameters(value):
    """
    Parse header parameters from a string.
    This is a compatibility function for Django REST framework.
    """
    if not value:
        return {}
    
    result = {}
    for key, val in parse_qsl(value, keep_blank_values=True):
        if val.startswith('"') and val.endswith('"'):
            val = val[1:-1]
        result[key] = val
    
    return result

def parse_header(line):
    """
    Parse a header line into a main value and a dictionary of parameters.
    """
    if not line:
        return '', {}
    
    parts = line.split(';', 1)
    value = parts[0].strip()
    params = {}
    
    if len(parts) > 1:
        for param in parts[1].split(';'):
            if '=' in param:
                key, val = param.split('=', 1)
                key = key.strip()
                val = val.strip()
                if val.startswith('"') and val.endswith('"'):
                    val = val[1:-1]
                params[key] = val
    
    return value, params

def valid_boundary(boundary):
    """
    Validate a multipart boundary string.
    This is a compatibility function for Django's multipart parser.
    """
    if not boundary:
        return False
    
    # Convert bytes to string if necessary
    if isinstance(boundary, bytes):
        try:
            boundary = boundary.decode('ascii')
        except UnicodeDecodeError:
            return False
    
    # Check if boundary is valid according to RFC 2046
    # Boundary should be 1-70 characters long and not contain spaces
    if len(boundary) > 70 or ' ' in boundary:
        return False
    
    # Check if boundary contains only valid characters
    valid_chars = set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\'()+_,-./:=?')
    return all(c in valid_chars for c in boundary)
