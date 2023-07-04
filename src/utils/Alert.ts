import Swal from 'sweetalert2';
import type {SweetAlertIcon} from 'sweetalert2';
import Locale from "@/locale/Locale";

export default class Alert {
    public static get GeneralError(): string {
        return Locale.locale('General error occurs');
    }

    public static warning(title: string, text: string): void {
        this.alert(title, text, 'warning', Locale.locale('OK'));
    }

    public static info(title: string, text: string): void {
        this.alert(title, text, 'info', Locale.locale('OK'));
    }

    public static error(title: string, text: string): void {
        this.alert(title, text, 'error', Locale.locale('OK'));
    }

    public static success(title: string, text: string): void {
        this.alert(title, text, 'success', Locale.locale('OK'));
    }

    public static errorHTML(title: string, html: string, icon: SweetAlertIcon = 'error', confirmButtonText = Locale.locale('OK')): void {
        this.alertHTML(title, html, icon, confirmButtonText);
    }

    public static successHTML(title: string, html: string, icon: SweetAlertIcon = 'success', confirmButtonText = Locale.locale('OK')): void {
        this.alertHTML(title, html, icon, confirmButtonText);
    }

    public static problem(title: string): void {
        this.toast(title, 'error');
    }

    public static good(title: string): void {
        this.toast(title, 'success');
    }

    public static notice(title: string): void {
        this.toast(title, 'warning');
    }

    /**
     * Alert that will do the action no matter what
     * @param title
     * @param text
     * @param confirmButtonText
     * @param action
     */
    public static runAlways(title: string, text: string, confirmButtonText: string, action: () => void): void {
        this.confirm(title, text, confirmButtonText, action, false);
    }

    public static alert(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string): void {
        Swal.fire({title, text, icon, confirmButtonText, padding: '2em'}).then();
    }

    public static alertHTML(title: string, html: string, icon: SweetAlertIcon, confirmButtonText: string) {
        Swal.fire({title, html, icon, confirmButtonText}).then();
    }

    public static toast(title: string, icon: SweetAlertIcon): void {
        Swal.fire({
            title,
            icon,
            position         : 'top',
            showConfirmButton: false,
            timer            : 3000,
            timerProgressBar : true,
            toast            : true,
        }).then();
    }

    public static confirm(title: string, text: string, confirmButtonText: string, action: () => void, showDenyButton = true, denyButtonText: string = Locale.locale('No')): void {
        Swal.fire({
            title,
            text,
            showDenyButton  : showDenyButton,
            showCancelButton: false,
            confirmButtonText,
            denyButtonText,
        }).then((result) => {
            if ((result.isConfirmed || !showDenyButton) && typeof action === 'function') {
                action();
            }
        });
    }
}
