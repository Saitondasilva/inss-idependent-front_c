import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import ProductsDashboard from "./screens/ProductsDashboard";
import NewProduct from "./screens/NewProduct";
import Drafts from "./screens/Drafts";
import Released from "./screens/Released";
import Comments from "./screens/Comments";
import Scheduled from "./screens/Scheduled";
import Customers from "./screens/Customers";
import CustomerList from "./screens/CustomerList";
import Promote from "./screens/Promote";
import Notification from "./screens/Notification";
import Settings from "./screens/Settings";
import UpgradeToPro from "./screens/UpgradeToPro";
import MessageCenter from "./screens/MessageCenter";
import ExploreCreators from "./screens/ExploreCreators";
import AffiliateCenter from "./screens/AffiliateCenter";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Earning from "./screens/Earning";
import Refunds from "./screens/Refunds";
import Payouts from "./screens/Payouts";
import Statements from "./screens/Statements";
import Shop from "./screens/Shop";
import PageList from "./screens/PageList";
import ProtectedRoute from "./utils/ProtectedRoute";
/* *********************************/
import Admin from "./screens/Admin";
import Sbscribe from "./screens/Sbscribe";
import Contacto from "./screens/Contacto";
import Profissional from "./screens/Proficional";
import Membro from "./screens/Membro";
//import Payment from "./screens/Settings/Payment";
import Pagamento from "./screens/Pagamento";
/*********************************************** */
import JornadaCliente from "./screens/JornadaCliente";
import CarteiraPesquisa from "./screens/CarteiraPesquisa";
import AnaliseProgreso from "./screens/AnaliseProgresso";
import NewCliente from "./screens/NewCliente";
import UtenteEdit from "./screens/UtenteEdit";
import UtentePrint from "./screens/UtentePrint";
import NewAgregados from "./screens/NewAgregados";
import NewContribuicao from "./screens/NewContribuicao";
/********************* */
import NewPedidoSubD from "./screens/NewPedidoSubD";
import NewPedidoSubFu from "./screens/NewPedidoSubFu";
import NewPedidoSubsideoMater from "./screens/NewPedidoSubsideoMater";
import NewPedidoPensaoVe_Inv from "./screens/NewPedidoPensaoVe_Inv";
import NewPedidoPensaoSob from "./screens/NewPedidoPensaoSob";

/************************************ */
import Teste from "./screens/Teste";
import BuscaProfissional from "./screens/BuscaProfissional";
import MinhasConsultas from "./screens/MinhasConsultas";
import MeusPagamentos from "./screens/MeusPagamentos";
import ListaUtente from "./screens/ListaUtente";



function App() {
  return (
    <Router>
      <Routes>
          <Route
            path="/"
            element={
            <ProtectedRoute>
              <Page title="Dashboard">
                <Home />
              </Page>
            </ProtectedRoute>
                 
            }
          />
          <Route
            path="/home2"
            element={
            <ProtectedRoute>
              <Page title="Dashboard">
                <NewProduct />
              </Page>
            </ProtectedRoute>
              
            }
          />
          <Route
            path="/home"
            element={
            <ProtectedRoute>
              <Page title="Dashboard">
                <Home />
              </Page>
            </ProtectedRoute>
              
            }
          />
          <Route
            path="/jornada/cliente/:id_consulta?"
            element={
              <ProtectedRoute>
                <Page title="Gestão de Contribuições" showCreator={0}>
                  <JornadaCliente />
                </Page>
              </ProtectedRoute>
              
            }
          />
          <Route
            path="/carteira/Pesquisa"
            element={
              <ProtectedRoute>
                <Page title="Todos Utentes">
                  <CarteiraPesquisa />
                </Page>
              </ProtectedRoute>              
            }
          />

          <Route
            path="/utente/lista"
            element={
              <ProtectedRoute>
                <Page title="Todos Utentes">
                  <ListaUtente />
                </Page>
              </ProtectedRoute>              
            }
          />


          <Route
            path="/analise/progresso/:cliente?"
            element={
              <ProtectedRoute>
                <Page title="Analise de Progresso" showCreator={1}>
                  <AnaliseProgreso />
                </Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/utente/add/:id?"
            element={
              <ProtectedRoute>
                <Page title="Cadastro de Beneficiário">
                  <NewCliente />
                </Page>
              </ProtectedRoute>
            }
          />
            <Route
            path="/utente/edit/:id?"
            element={
              <ProtectedRoute>
                <Page title="Aterar dados do Beneficiário">
                  <UtenteEdit />
                </Page>
              </ProtectedRoute>
            }
          />
                 <Route
            path="/utente/Print/:id?"
            element={
              <ProtectedRoute>
                <Page title="">
                  <UtentePrint />
                </Page>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Agregado/add"
            element={
              <ProtectedRoute>
                <Page title="Cadastro Agregados">
                  <NewAgregados />
                </Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Contribuicao/add"
            element={
              <ProtectedRoute>
                <Page title="Cadastro Contribuição">
                  <NewContribuicao />
                </Page>
              </ProtectedRoute>
            }
          />

          
          <Route
            path="Subsideo/add"
            element={
              <ProtectedRoute>
                <Page title="Pedido de Subsídio de Doença">
                  <NewPedidoSubD />
                </Page>
              </ProtectedRoute>
            }
          />

         <Route
            path="/Subsideo/add/1"
            element={
              <ProtectedRoute>
                <Page title="Pedido de Subsídio de Maternidade">
                  <NewPedidoSubsideoMater />
                </Page>
              </ProtectedRoute>
            }
          />



          <Route
            path="/Subsideo/add/2"
            element={
              <ProtectedRoute>
                <Page title="Pedido de Subsídio de Funeral">
                  <NewPedidoSubFu />
                </Page>
              </ProtectedRoute>
            }
          />

           <Route
            path="/Pensao/add"
            element={
              <ProtectedRoute>
                <Page title="Pedido de Pensão de Velhice/Invalidez">
                  <NewPedidoPensaoVe_Inv />
                </Page>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Pensao/add/1"
            element={
              <ProtectedRoute>
                <Page title="Pedido de Pensão de Sobrivivencia">
                  <NewPedidoPensaoSob />
                </Page>
              </ProtectedRoute>
            }
          />



          <Route
            path="/agenda/profissional"
            element={
              <ProtectedRoute>
                <Page title="Agenda do profissional">
                <Teste />
              </Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/busca/profissional"
            element={
              <ProtectedRoute>
                <Page title="Encontre seu especialista">
                  <BuscaProfissional />
                </Page>
              </ProtectedRoute>
              }
          />
          <Route
            path="/minhas/consultas"
            element={
              <ProtectedRoute>
                <Page title="Minhas Consultas">
                  <MinhasConsultas />
                </Page>
              </ProtectedRoute>
              }
          />
         
          <Route
            path="/products/dashboard"
            element={
              <Page title="Products dashboard">
                <ProductsDashboard />
              </Page>
            }
          />
          <Route
            path="/products/drafts"
            element={
              <Page title="Drafts">
                <Drafts />
              </Page>
            }
          />
          <Route
            path="/products/released"
            element={
              <Page title="Released">
                <Released />
              </Page>
            }
          />
          <Route
            path="/products/comments"
            element={
              <Page title="Comments">
                <Comments />
              </Page>
            }
          />
          <Route
            path="/products/scheduled"
            element={
              <Page title="Scheduled">
                <Scheduled />
              </Page>
            }
          />
          <Route
            path="/user/admin"
            element={
              <Page title="Utilizadores">
                <Admin />
              </Page>
            }
          />
          <Route
            path="/subscribes"
            element={
              <Page title="Sbscribes">
                <Sbscribe />
              </Page>
            }
          />
          <Route
            path="/contactos"
            element={
              <Page title="Contactos">
                <Contacto />
              </Page>
            }
          />
          <Route
            path="/profissional"
            element={
              <Page title="Pagamentos">
                <Profissional />
              </Page>
            }
          />
          <Route
            path="/membro"
            element={
              <Page title="Subsidios">
                <Membro />
              </Page>
            }
          />
          <Route
            path="/payment/user/type/:id_type_user"
            element={
              <Page title="Pagamentos">
                <Pagamento />
              </Page>
            }
          />
          <Route
            path="/meus/pagamentos"
            element={
              <Page title="Pagamentos">
                <MeusPagamentos />
              </Page>
            }
          />
          <Route
            path="/customers/overview"
            element={
              <Page title="Customers">
                <Customers />
              </Page>
            }
          />
          <Route
            path="/customers/customer-list"
            element={
              <Page title="Lista de Pensionista">
                <CustomerList />
              </Page>
            }
          />
          {/*
          <Route
            path="/customers/customer-list"
            element={
              <Page title="Customer list">
                <CustomerList />
              </Page>
            }
          />
          */}
          <Route
            path="/shop"
            element={
              <Page wide>
                <Shop />
              </Page>
            }
          />
          <Route
            path="/income/earning"
            element={
              <Page title="Estatística">
                <Earning />
              </Page>
            }
          />
          <Route
            path="/income/refunds"
            element={
              <Page title="Refunds">
                <Refunds />
              </Page>
            }
          />
          <Route
            path="/income/payouts"
            element={
              <Page title="Payouts">
                <Payouts />
              </Page>
            }
          />
          <Route
            path="/income/statements"
            element={
              <Page title="Statements">
                <Statements />
              </Page>
            }
          />
          <Route
            path="/promote"
            element={
              <Page title="Promote">
                <Promote />
              </Page>
            }
          />
          <Route
            path="/notification"
            element={
              <Page title="Notificações">
                <Notification />
              </Page>
            }
          />
          <Route
            path="/settings"
            element={
              <Page title="Settings">
                <Settings />
              </Page>
            }
          />
          <Route
            path="/upgrade-to-pro"
            element={
              <Page title="Upgrade to Pro">
                <UpgradeToPro />
              </Page>
            }
          />
          <Route
            path="/message-center"
            element={
              <Page title="Message center">
                <MessageCenter />
              </Page>
            }
          />
          <Route
            path="/explore-creators"
            element={
              <Page title="Explore creators">
                <ExploreCreators />
              </Page>
            }
          />
          <Route
            path="/affiliate-center"
            element={
              <Page title="Affiliate center">
                <AffiliateCenter />
              </Page>
            }
          />
          
         
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={ <SignIn />} />
        <Route path="/pagelist" component={PageList} />
        <Route path="/*" element={
            <Route path="/sign-in" element={ <SignIn />} />
              
            } />
      </Routes>
    </Router>
  );
}

export default App;
