function HelloWorld(props:{ name: string}) {
    let {name} = props;
    return(
        <div>Voici vos recettes {name}
        </div>
    );
}

export default HelloWorld;