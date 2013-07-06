import sys
import SimpleHTTPServer
import SocketServer

__author__ = '1000ch'

args = sys.argv

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", args[0]), Handler)

print "serving at port", args[0]
httpd.serve_forever()