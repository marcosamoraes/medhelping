import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack'

import Cadastro from "../../app/login-pages/cadastro";
import Forgot from '../../app/login-pages/forgotPassword'
import Login from '../../app/login-pages/login'

import Home from '../../app/main-pages/home';
import AlterarSenha from '../../app/main-pages/alterarSenha';
import Configuracoes from '../../app/main-pages/configuracoes';
import EditarPerfil from '../../app/main-pages/editarPerfil';
import FaleConosco from '../../app/main-pages/faleConosco';
import ListaCategorias from '../../app/main-pages/listaCategorias';
import PublicarDiagnostico from '../../app/main-pages/publicarDiagnostico';
import PublicarPlantao from '../../app/main-pages/publicarPlantao';
import VerPerfil from '../../app/main-pages/verPerfil';
import VerPublicacao from '../../app/main-pages/verPublicacao';
import Shifts from '../../app/main-pages/shifts';
import ViewShift from '../../app/main-pages/viewShift';
import ViewPublicationImage from '../../app/main-pages/ViewPublicationImage';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@contexts/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createURL, useURL } from 'expo-linking';
import { RedirectContext } from '@contexts/Redirect';

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator()

  const { user, checkIsLogged } = useContext(AuthContext)
  const { setPath, setId } = useContext(RedirectContext)

  checkIsLogged()

  const redirectURL = useURL()

  const screenOptions = {
    headerShown: false,
    animation: 'fade',
    gestureEnabled: false,
  } as NativeStackNavigationOptions

  const prefix = createURL("/")

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        register: 'register',
        viewPublication: {
          path: 'viewPublication/:id',
          parse: {
            id: (id: string) => Number(id)
          }
        },
      }
    }
  };

  useEffect(() => {
    if (redirectURL) {
      const queryParams = redirectURL?.split('?')[1]
      const params = queryParams?.split('&').reduce((acc: any, param: string) => {
        const [key, value] = param.split('=')
        acc[key] = value
        return acc
      }, {})
      setPath(params?.path)
      setId(params?.id)
    }
  }, [redirectURL])
  
  return (
    <NavigationContainer linking={linking} independent={true}>
      <Navigator screenOptions={screenOptions}>
        {user.id ? (
          <>
            <Screen name='home' component={Home} />
            <Screen name='updatePassword' component={AlterarSenha} />
            <Screen name='settings' component={Configuracoes} />
            <Screen name='editProfile' component={EditarPerfil} />
            <Screen name='contact' component={FaleConosco} />
            <Screen name='listCategories' component={ListaCategorias} />
            <Screen name='publishArticle' component={PublicarDiagnostico} />
            <Screen name='publishShift' component={PublicarPlantao} />
            <Screen name='shifts' component={Shifts} />
            <Screen name='viewProfile' component={VerPerfil} />
            <Screen name='viewPublication' component={VerPublicacao} />
            <Screen name='viewPublicationImage' component={ViewPublicationImage} />
            <Screen name='viewShift' component={ViewShift} />
          </>
        ): (
          <>
            <Screen name='login' component={Login} />
            <Screen name='register' component={Cadastro} />
            <Screen name='forgotPassword' component={Forgot} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
