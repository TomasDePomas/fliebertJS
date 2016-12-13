/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 27-11-16 - 11:32
 */

const DecoratorRegistry = [];

class Decorator {
    static registerStyle(name, method) {
        DecoratorRegistry[name] = method;
    }

    static renderStyle(name, object) {
        DecoratorRegistry[name](object);
    }
}