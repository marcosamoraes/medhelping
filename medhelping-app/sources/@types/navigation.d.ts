export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined
      register: undefined
      forgotPassword: undefined

      home: {id: int} | undefined
      updatePassword: undefined
      settings: undefined
      editProfile: undefined
      contact: undefined
      listCategories: undefined
      shifts: undefined
      publishArticle: undefined
      publishShift: undefined
      viewProfile: {id: int} | undefined
      viewPublication: {
        id: int
      }
      viewShift: {
        id: int
      }
      viewPublicationImage: {
        image: string
      }
    }
  }
}