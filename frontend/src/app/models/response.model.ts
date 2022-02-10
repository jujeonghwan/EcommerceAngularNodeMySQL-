


export interface ProjectModelServer {
  projectId: Number;
  projectName: String;
  contactFirstName: String;
  contactLastName: String;
  contactEmail: String;
  contactPhone: String;

  description: String;
  businessGoals: String;
  prerequisites: String;
  additionalNotes: String;

  projectStatus: Number;
  clientUserId: Number;

  created: String;
  updated: String;
}


export interface projectsResponse {
  count: number;
  projects: ProjectModelServer[]
};

/*
export interface CartModelServer {
  total: Number;
  data: [{
    product: ProductModelServer,
    numInCart: Number
  }];
}

export interface CartModelPublic {
  total: Number;
  prodData: [{
    id: Number,
    incart: Number
  }]
}
*/