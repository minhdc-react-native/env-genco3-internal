import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
export const useHelper = () => {
    const formatDate = (strDate?: string, format: 'dd/MM/yyyy HH:mm:ss' | 'yyyy-MM-dd HH:mm:ss' = 'dd/MM/yyyy HH:mm:ss', removeTime = true) => {
        if (!strDate) return '';
        const date = strDate ? dayjs.utc(strDate).format("YYYY-MM-DD") : dayjs.utc().format("YYYY-MM-DD");
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

    return {
        formatDate
    }
}