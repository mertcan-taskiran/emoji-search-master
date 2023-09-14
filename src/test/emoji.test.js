import React from "react"
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import emojiList from "../emojiList.json";
import App from "../App";

describe("Emoji Search Test", ()=>{

    let header, input, emoji, filterList;

    beforeEach(() =>{
        render(<App />);
    });

    // Başlık kısmının başarılı bir şekilde render edildiğini kontrol edecek olan test kodunu yazın
    test('header test', () => {
        header = screen.getByText(/Emoji Search/i);
        expect(header).toBeInTheDocument();
        const images = screen.getAllByRole("img");
        expect(images[0]);
        expect(images[1]);
    })

    // Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol edecek olan test kodunu yazın.
    test("emoji list test",()=>{
        emoji = emojiList.slice(0,19);
        emoji.map((item) =>{expect(screen.getByText(item.title)).toBeInTheDocument();});
    })

    // Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde yeniden render edildiğini kontrol edecek olan test kodunu yazın.
    test("emoji list filter test", () => {
        input = screen.getByRole("textbox");
        const filter = "smile cat";
        filterList = emojiList.filter(it => it.keywords.toLowerCase().match(filter) || it.title.toLowerCase().match(filter));
        fireEvent.change(input,{target:{value:filter}});
        expect(screen.getAllByText(/cat/i)).toHaveLength(2);
    });

    // Liste üzerinden herhangi emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol edecek olan test kodunu yazın.
    test("emoji copy test", async () => {
        const click = screen.getByText("Joy");
        expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
        console.log(click.parentElement.getAttribute("data-clipboard-text"));
        expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("😂");
    });
    
})