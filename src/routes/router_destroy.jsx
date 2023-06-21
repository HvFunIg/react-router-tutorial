import {redirect, } from "react-router-dom";
import { deleteContact } from "../js/router_tutorial";

export async function action({ params }) {
    await deleteContact(params.contactId);
    return redirect("/");
}