import classNames from "classnames";
import { useAtom } from "jotai";
import { useRef, type KeyboardEvent } from "react";

import { SearchDiscardIcon, SearchIcon } from "@/assets/icons";
import { Button, Input } from "@/libs/ui";

import { inputValueAtom, submittedQueryAtom } from "../../store";

export const Search = () => {
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [submittedQuery, setSubmittedQuery] = useAtom(submittedQueryAtom);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSubmittedQuery(inputValue);
    inputRef.current?.blur();
  };

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const reset = () => {
    setSubmittedQuery("");
    setInputValue("");
  };

  return (
    <div
      className={classNames(
        "fixed z-10 flex w-full items-center gap-[8px] bg-white px-[16px] transition-all duration-500 ease-in-out lg:px-[80px]",
        submittedQuery
          ? "top-0 left-0 translate-0 py-[16px]"
          : "top-[50%] left-[50%] max-w-[512px] -translate-1/2 py-0",
      )}
    >
      <Input
        ref={inputRef}
        className={classNames("grow", submittedQuery && "max-w-[420px]")}
        leftSection={<SearchIcon />}
        rightSection={
          inputValue && (
            <SearchDiscardIcon
              className="hover:cursor-pointer"
              onClick={reset}
            />
          )
        }
        placeholder="Телефоны, яблоки, груши..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onEnter}
      />
      <Button onClick={handleSearch}>Искать</Button>
    </div>
  );
};
