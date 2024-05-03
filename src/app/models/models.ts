export interface LeaveType {
    id: number;
    name: string;
}

export interface AssignedLeave {
    userId: number;
    user: User; // You can define a proper user interface if needed
    leaveTypeId: number;
    leaveType: LeaveType;
    numberOfLeave: number;
}

export interface ResponseUsers{
    data:User[],
    errorMessage: string;
}
export interface ResponseUser{
    data:User,
    errorMessage: string;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    leaves?: any; // You can define a proper leave interface if needed
    assignLeaves?: AssignedLeave[];
    role?:string
}

export interface Data {
    user: User;
    leaveType: LeaveType;
    numberOfLeave: number;
}

export interface ApiResponse {
    data: Data[];
    errorMessage: string;
}
export interface LoginResponse {
    data: string;
    errorMessage: string;
}
export interface CustomErrorResponse {
  data: any;
  errorMessage: string;
}
export interface JwtClaims {
    aud: string;
    exp: number;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
    "UserId": string,
    iss: string;
    jti: string;
  }

  export interface LeaveListResponse {
    data: Data[];
    errorMessage: string;
}
  export interface Data {
    id: number;
    user: User;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    numbserOfLeave: number;
    leaveStatus: number;
  }

  export interface LeaveAssignment {
    userId: number;
    leaveTypeId: number;
    NumbserOfLeave: number;
  }
  
export interface ApplyLeave {
    id?: number;
    userId: number;
    leaveTypeId: number;
    startDate: Date;
    endDate: Date;
    numberOfLeave: number;
    leaveStatus: number;
  }

  export interface MyLeavesResponse {
    data: Leave[];
    errorMessage: string;
  }
  export interface Leave {
    id: number;
    userId: number;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    numbserOfLeave: number;
    leaveStatus: number;
  }

  export interface LeaveById {
    id: number;
    user: UserUserFForGetLeaveById;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    numberOfLeave: number;
    leaveStatus: number;
  }


  
  export interface UserUserFForGetLeaveById {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    leaves: Leave[];
    assignLeaves: any; // Adjust the type accordingly
  }
  
  export interface LeaveType {
    id: number;
    name: string;
  }
  
  export interface GetLeaveBYIdREsponse {
    data: LeaveById;
    errorMessage: string;
  }



  //For leave balance

  export interface LeaveForMyLeave {
    id: number;
    name: string;
}

export interface UserForMyLeave {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    numbserOfLeave: number;
    leaveType: LeaveForMyLeave;
    assignLeaves: LeaveForMyLeave[];
    leaves: any; // Change the type if 'leaves' has a specific structure
}

export interface MySigleLeaveBalanceResponse {
    data: UserForMyLeave;
    errorMessage: string;
}

  
  