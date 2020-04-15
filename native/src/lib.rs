use markov::Chain;
use std::path::Path;
use neon::prelude::*;

type StringChain = Chain<String>;

declare_types! {
    pub class JsChain for StringChain {
        init(mut cx) {
            match cx.argument_opt(0) {
                Some(arg) => {
                if arg.is_a::<JsNumber>() {
                    let order = arg.downcast::<JsNumber>().or_throw(&mut cx)?.value() as usize;
                    Ok(StringChain::of_order(order))
                } else if arg.is_a::<JsString>() {
                    let js_path = cx.argument::<JsString>(0)?.value();
                    let path = Path::new(&js_path);

                    Ok(StringChain::load(path).unwrap())
                } else {
                    panic!("Argument must be of type string or number");
                }
                },
                None => Ok(StringChain::new())
            }
        }

        method isEmpty(mut cx) {
            let this = cx.this();
            let guard = cx.lock();
            let is_empty = this.borrow(&guard).is_empty();

            Ok(cx.boolean(is_empty).upcast())
        }

        method feedString(mut cx) {
            let string = cx.argument::<JsString>(0)?.value();

            let mut this = cx.this();
            let guard = cx.lock();
            this.borrow_mut(&guard).feed_str(string.as_str());

            Ok(cx.undefined().upcast())
        }

        method feedFile(mut cx) {
            let js_path = cx.argument::<JsString>(0)?.value();
            let path = Path::new(&js_path);

            let mut this = cx.this();
            let guard = cx.lock();

            this.borrow_mut(&guard).feed_file(path).unwrap();

            Ok(cx.undefined().upcast())
        }

        method generateString(mut cx) {
             let this = cx.this();
             let guard = cx.lock();
             let mimic = this.borrow(&guard).generate_str();

             Ok(cx.string(mimic).upcast())
        }

        method generateStringFromToken(mut cx) {
             let token = cx.argument::<JsString>(0)?.value();

             let this = cx.this();
             let guard = cx.lock();
             let mimic = this.borrow(&guard).generate_str_from_token(token.as_str());

             Ok(cx.string(mimic).upcast())
        }

        method save(mut cx) {
            let js_path = cx.argument::<JsString>(0)?.value();
            let path = Path::new(&js_path);

            let this = cx.this();
            let guard = cx.lock();

            this.borrow(&guard).save(path).unwrap();

            Ok(cx.undefined().upcast())
        }
    }
}

register_module!(mut m, {
    m.export_class::<JsChain>("Chain")?;
    Ok(())
});
