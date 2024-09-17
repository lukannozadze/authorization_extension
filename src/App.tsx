import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useClerk,
  useUser,
  ClerkProvider,
} from "@clerk/chrome-extension";

import {
  useNavigate,
  Routes,
  Route,
  MemoryRouter
} from "react-router-dom";

function HelloUser() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p>
      <p>
        <button onClick={() => clerk.signOut()}>Sign out</button>
      </p>
    </>
  );
}

const publishableKey = "pk_test_bGl2aW5nLWFhcmR2YXJrLTc1LmNsZXJrLmFjY291bnRzLmRldiQ";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
 
  return (
    <ClerkProvider publishableKey={publishableKey} navigate={(to) => navigate(to)}>
      <div>
        <main className="main">
          <Routes>
            <Route
              path="/sign-up/*"
              element={<SignUp signInUrl="/" />}
            />
            <Route path='/' element={
              <>
                <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
                </SignedOut>
              </>
            } />
          </Routes>
        </main>
      </div>
    </ClerkProvider>
  );
}

function App() {
  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  );
}

export default App;
