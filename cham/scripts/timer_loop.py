import sys, time, traceback

delay=300

def every(delay, task):
  next_time = time.time() + delay
  while True:
    time.sleep(max(0, next_time - time.time()))
    try:
      task()
    except Exception:
      traceback.print_exc()
    next_time += (time.time() - next_time) // delay * delay + delay

def foo():
   file_name = sys.argv[1]
   exec(open(file_name).read())

try: 
    every(delay, foo)
except KeyboardInterrupt:
     print("Keyboard Interrupt: Exiting script")