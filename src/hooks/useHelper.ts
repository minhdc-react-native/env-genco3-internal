import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
export const useHelper = () => {
    const formatDate = (strDate?: string, format: 'dd/MM/yyyy HH:mm:ss' | 'yyyy-MM-dd HH:mm:ss' = 'dd/MM/yyyy HH:mm:ss', removeTime = true) => {
        if (!strDate) return '';
        const date = strDate ? dayjs.utc(strDate).format("YYYY-MM-DD HH:mm:ss") : dayjs.utc().format("YYYY-MM-DD HH:mm:ss");
        const d = dayjs(date);
        const day = d.format('DD');
        const month = d.format('MM');
        const year = d.format('YYYY');
        const hours = d.format('HH');
        const minutes = d.format('mm');
        const seconds = d.format('ss');
        switch (format) {
            case "dd/MM/yyyy HH:mm:ss":
                return `${day}/${month}/${year}` + (removeTime ? `` : ` ${hours}:${minutes}:${seconds}`);
            default:
                return `${year}-${month}-${day}` + (removeTime ? `` : ` ${hours}:${minutes}:${seconds}`);
        }
    }

    const formatDateText = (strDate?: string) => {
        if (!strDate) return '';
        const date = strDate ? dayjs.utc(strDate).format("YYYY-MM-DD HH:mm:ss") : dayjs.utc().format("YYYY-MM-DD HH:mm:ss");
        const d = dayjs(date);
        const day = d.format('DD');
        const month = d.format('MM');
        const year = d.format('YYYY');
        const hours = d.format('HH');
        const minutes = d.format('mm');

        return `${hours}:${minutes}, ngày ${day}/${month}/${year}`;
    }
    const isNotEmpty = (value: any): boolean => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        if (typeof value === "number" && value === 0) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === "object" && Object.keys(value).length === 0) return false;
        return true;
    }
    return {
        formatDate,
        formatDateText,
        isNotEmpty
    }
}