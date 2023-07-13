class Extender {
    public static init() {
        String.prototype.capitalize = function () {
            return `${this.charAt(0).toUpperCase()}${this.slice(1)}`;
        }
    }
}

Extender.init();