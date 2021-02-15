import pydnsbl
from pydnsbl.providers import Provider, BASE_PROVIDERS
from main import event_loop

_provides = [ 
    "dnsbl.dronebl.org",
    "dnsbl.spfbl.net"
]

_ip_checker = pydnsbl.DNSBLIpChecker(loop=event_loop, timeout=.3, tries=1, concurrency=50, providers=[ Provider(x) for x in _provides ])

async def is_ip_address_bad(ip):
    return await _ip_checker.check_async(ip)
