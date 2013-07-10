import sys
import SimpleHTTPServer
import SocketServer

__author__ = '1000ch'

args = sys.argv

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
print args[1]
httpd = SocketServer.TCPServer(("", args[1]), Handler)

print "serving at port", args[1]
httpd.serve_forever()