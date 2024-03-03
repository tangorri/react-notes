import { useState } from "react";

export default function Filters({onFilterChanged}) {

  const [keyword, keywordSetter] = useState('');

  const onKeyWordChanged = e => {
    const keyword = e.target.value;
    keywordSetter(keyword)
    onFilterChanged(keyword);
  };

  return (
    <form>
      <fieldset>
        <legend>Recherche une note</legend>
      <input name="keyword" type="search" placeholder="rechercher par mot" value={keyword} onChange={onKeyWordChanged} />
      </fieldset>
    </form>
  );
}
