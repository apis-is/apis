
#include <v8.h>
#include <node.h>
#include <cstdio>
#include <stdlib.h>
#include <string.h>
#ifdef __NODE_V0_11__
#include <fcntl.h>
#endif

//#ifdef __POSIX__
#include <unistd.h>
/*#else
#include <process.h>
#endif*/

using namespace node;
using namespace v8;

static int clear_cloexec (int desc)
{
    int flags = fcntl (desc, F_GETFD, 0);
    if (flags <  0)
        return flags; //return if reading failed

    flags &= ~FD_CLOEXEC; //clear FD_CLOEXEC bit
    return fcntl (desc, F_SETFD, flags);
}

static int do_exec(char *argv[])
{
        clear_cloexec(0); //stdin
        clear_cloexec(1); //stdout
        clear_cloexec(2); //stderr
        return execvp(argv[0], argv);
}

#ifdef __NODE_V0_11__
static void kexec(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
#else
static Handle<Value> kexec(const Arguments& args) {
    HandleScope scope;
#endif


    /*
     * Steve Blott: 17 Jan, 2014
     *              Temporary comment by way of explanation...
     *              To be deleted.
     *
     * With a single argument:
     *   - pass it to execvp as "sh -c 'args[0]'"
     *   - this is the existing usage
     *
     * With exactly two arguments:
     *   - the first is the command name
     *   - the second is an array of arguments
     *     ...as in process.child_process.spawn()
     *
     * This approach is not great, but it allows the established usage to
     * coexist with direct execvp-usage, and avoids making any changes to the
     * established API.
     */

    if ( 1 == args.Length() && args[0]->IsString() )
    {
        String::Utf8Value v8str(args[0]);
        char* argv[] = { const_cast<char *>("/bin/sh"), const_cast<char *>("-c"), *v8str, NULL};

        int err = do_exec(argv);

#ifdef __NODE_V0_11__
        Local<Number> num = Number::New(isolate, err);
        args.GetReturnValue().Set(num);
#else
        Local<Number> num = Number::New(err);
        return scope.Close(num/*Undefined()*/);
#endif
    }

    if ( 2 == args.Length() && args[0]->IsString() && args[1]->IsArray() )
    {
        String::Utf8Value v8str(args[0]);

        // Substantially copied from:
        // https://github.com/joyent/node/blob/2944e03/src/node_child_process.cc#L92-104
        Local<Array> argv_handle = Local<Array>::Cast(args[1]);
        int argc = argv_handle->Length();

        int argv_length = argc + 1 + 1;
        char **argv = new char*[argv_length];

        argv[0] = *v8str;
        argv[argv_length-1] = NULL;
        for (int i = 0; i < argc; i++) {
#ifdef __NODE_V0_11__
            String::Utf8Value arg(argv_handle->Get(Integer::New(isolate, i))->ToString());
#else
            String::Utf8Value arg(argv_handle->Get(Integer::New(i))->ToString());
#endif
            argv[i+1] = strdup(*arg);
        }

        int err = do_exec(argv);

        // Failed...!
        // FIXME: It might be better to raise an exception here.
        for (int i = 0; i < argc; i++)
            free(argv[i+1]);
        delete [] argv;

#ifdef __NODE_V0_11__
        Local<Number> num = Number::New(isolate, err);
        args.GetReturnValue().Set(num);
#else
        Local<Number> num = Number::New(err);
        return scope.Close(num/*Undefined()*/);
#endif
    }

#ifdef __NODE_V0_11__
    isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "kexec: invalid arguments")));
    args.GetReturnValue().Set(Undefined(isolate));
#else
    ThrowException(Exception::TypeError(String::New("kexec: invalid arguments")));
    return scope.Close(Undefined());
#endif
}

extern "C" {
    static void init (Handle<Object> target) {
        NODE_SET_METHOD(target, "kexec", kexec);
    }

    NODE_MODULE(kexec, init);
}
