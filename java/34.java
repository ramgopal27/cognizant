// module-info.java in com.utils
module com.utils {
    exports com.utils;
}

// module-info.java in com.greetings
module com.greetings {
    requires com.utils;
}

// Example class in com.utils
package com.utils;
public class Util {
    public static String greet(String name) {
        return "Hello " + name;
    }
}

// Example class in com.greetings
package com.greetings;
import com.utils.Util;
public class Main {
    public static void main(String[] args) {
        System.out.println(Util.greet("World"));
    }
}
