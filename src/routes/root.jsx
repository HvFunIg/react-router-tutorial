import { useEffect } from "react";
import { 
  Outlet,           // Отображение дочерних элементов
  //Link,           // Ссылка
  NavLink,          // Активная ссылка (альтернатива Link)
  Form,             // Форма с автообновлением
  useLoaderData,    // Хук для отображения данных из loader'a
  useNavigation,    // Все данные о навигации и загрузках
  useSubmit,         // Чтобы делать отправку запросов сраху при изменениях в строке поиска
  redirect,         // перенаправление
} from "react-router-dom";

import { 
  getContacts, 
  createContact  
} from "../js/router_tutorial";

/**
 * Вызывается при GET-запросах (новый URL)
 * @param {*} param0 
 * @returns q - содержимое параметра, задаваемого в поле c name="q"
 */
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts,q };
}

/**
 * Действие при нажатии на кнопку New (POST-запрос)
 * @returns Перенаправляет на страницу для редактирования новой записи
 */
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}


export default function Root() {
  //Этот хук не загружает данные, а только отображает
  const { contacts, q } = useLoaderData();   //Данные берутся из loader'a, 
  const navigation = useNavigation(); // "idle" | "submitting" | "loading".
  const submit = useSubmit();
  
  // Для спиннера загрузки
  const searching = navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                //Чтобы в истории не сохранялись запросы на каждый новый введенный символ
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
        {contacts?.length ? (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                  <NavLink
                  to={`contacts/${contact.id}`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{" "}
                  {contact.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
        </nav>
      </div>
      <div id="detail" className={
        navigation.state === "loading" ? "loading" : ""
      }>
      <Outlet />
      </div>
    </>
    );
  }