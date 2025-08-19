export { };
declare global {
    interface IToken {
        access_token: string;
        refresh_token: string;
    }
    interface ILogin {
        userName: string;
        password: string;
        remember: boolean
    }
    interface IUser {
        id: string;
        code: string;
        userName: string;
        fullName: string;
        contract: string;
        contractSignedDate: string;
        gender: number;
        birthDate: string;
        imageUrl: string;
        email: string;
        positionName: string;
        departmentName: string;
        teamName: string;
        currentRank: number;
        rankScale: number
    }
}