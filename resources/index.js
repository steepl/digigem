import blocks from "./blocks";
import cpp from "./c++";
import html from "./html";
import javascript from "./javascript";
import lua from "./lua";
import python from "./python";
import utility from "./utility";
import microbit from "./microbit";
import minecraft from "./minecraft";

const sortByTitle = ({ title: titleA }, { title: titleB }) => {
	if (titleA < titleB) return -1;
	if (titleA > titleB) return 1;
	return 0;
};

export default [
	// css,
	// daily,
	blocks,
	// design,
	// frontend,
	lua,
	// fullstack,
	cpp,
	// general,
	html,
	javascript,
	// php,
	// podcasts,
	python,
	// ruby,
	// server,
	microbit,
	minecraft,
	utility,
	// icons,
	// accessibility,
	// rust,
	// contentCreators,
].sort(sortByTitle);
