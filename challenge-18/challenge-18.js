/*
1. Envolva todo o conteúdo desse desafio em uma IIFE.
2. Adicione a diretiva 'use strict';
3. Crie um arquivo index.html e adicione esse script à ele.
*/

// \n -> representa uma quebra de linha
// \s -> representa um espaço em branco, também faz match com caracteres de quebra de linha.
// \t -> tabulação (meta caracter da tecla tab), também faz match com caracteres de quebra de linha.
// . -> qualquer caracter que não seja uma quebra de linha.
// [^abc] -> o match deve ser feito com qualquer item, menos com os da lista -a, b ou c, por exemplo.
// \W -> qualquer númerico, menos os alfanuméricos.
// \D -> qualquer caractere, menos os digitos.
// \S -> qualquer caractere, menos os espaços em branco
// {n} intervalo exato -> faz a repetição de um caracter num valor exato.
// {n, m} intervalo -> item anterior ao menos n vezes, e no máximo m veezes.
// {n, } intervalo aberto -> tenha no minimo 1x e no máximo indefinido.
// \d\d? opcional -> zero ou uma ocorrencia do item anterior. (o exemplo é um número e um segundo número por opção).
// \w+ -> uma ou mais ocorrencias do item anterior. (exemplo 1 alfanumerico, faz match com palavras ).
// \w* -> zero ou mais ocorrencias do item anterior. 

/* EXEMPLO DE VALIDAÇÃO DE LINKS 

    var regex = / https?:\/\/\[^.]w+[.\w]+ / ;
    s? -> o 's' será opcional
    [^.] -> o primeiro caracter não pode ser um ponto
    /\ -> escapa o caracter /

    EXEMPLO DE VALIDAÇÃO DE EMAIL

    var regex = [\w+]+@\w+\.\w+([.\w]+)?

    EXEMPLO DE CAPTURA E VALOR DE QUERY STRING

    var queryString = '?nome=fernando&idade=25&sexo=masculino'
    var regexQS = queryString.replace(/ [?&](\w+)=(\w+) /g, function (regex, key, value) {
        console.log(key, value); // grupo da regex 
    }) ;   

*/
(function() {
    'use strict';
    /*
    Crie uma função chamada `cleanCPF`, que receba um CPF por parâmetro, e
    retorne esse CPF limpo (somente os números).
    Usando os CPFs abaixo, mostre no console que a limpeza funciona para todos
    eles! Use um console.log para cada CPF.
    - "049-214 3421-1"
    - "210.458.522-05"
    - "735 500 794 - 22"
    - "101.123-131x32"
    */
    console.log( 'Limpando CPFs:' );
    function cleanCPF(cpf) {
        // cpf.replace(/\D/g, ''); // \D pega tudo o que não é numero inverte a logica do \d;
        return cpf.replace(/[^\d+]/g, '');
    }
    var cpfs = [ '049-214 3421-1', '210.458.522-05', '735 500 794 - 22', '101.123-131x32' ];
    var cleanedCpfs = cpfs.map(function(cpf) {
        return  cleanCPF(cpf);
    });
    console.log(cleanedCpfs);

    /*
    Usando os CPFs limpos acima, deixe-os com a formatação correta de CPF.
    Ex.: "999.999.999-99"
    Mostre o resultado no console.
    */
    console.log( '\nFormatando CPFs corretamente:' );
    function formatCPF(cpf) {
        var formattedCPF = cleanCPF(cpf);
        
        return formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, function(regex, arg1, arg2, arg3, arg4){
            return arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4;
        });
        
        // return formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
        
        /*        
        RESOLUÇÃO FEIETA POR MIM, GASTANDO MAIS CODIGO. 
        var i = 0;
        return formattedCPF.replace(/(\d{3})|(\d{2})/g, function(match) {
            if(i === 2) {
                match += '-';
            } else if (i < 2) {
                match += '.';
            }
            i++;
            return match ;
        }); */

    }

    cleanedCpfs.forEach(function(cpf) {
        console.log(formatCPF(cpf));
    });

    /*
    Crie uma expressão regular que faça match com as palavras "junho" ou "julho",
    usando o mínimo de caracteres possíveis na regex.
    Para garantir que a regex funciona, teste-a usando o método match. Se houver
    o match, o método retorna um array com os matches. Caso contrário, ele
    retornará null.
    Mostre no console o resultado do match para a frase:
    "Os meses de janeiro, junho e julho começam com a letra j."
    O resultado deve ser:
    ["junho", "julho"]
    */
    console.log( '\nMatch com as palavras "junho" ou "julho" para a frase "Os meses de janeiro, junho e julho começam com a letra j.":' );
    var text = 'Os meses de janeiro, junho e julho começam com a letra j.';
    var regex = /j\w{3}o/g;

    console.log(text.match(regex));


    /*
    Crie uma expressão regular que faça o match com a abertura de uma tag
    HTML qualquer.
    Ex.: "<div>", "<section>", "<blockquote>".
    Use o método match e faça o teste com a marcação abaixo:
    "<div><section><blockquote>Texto <img /></blockquote></section></div>"
    O resultado deve ser:
    ["<div>", "<section>", "<blockquote>"]
    */
    console.log( '\nMatch com a abertura de uma tag HTML:' );
    
    text = '<div><section><blockquote>Texto <img /></blockquote></section></div>';
    regex = /<\w+>/g;

    console.log(text.match(regex));

    /*
    Crie uma expressão regular que faça o match com uma tag HTML vazia, casando
    com a abertura e fechamento da tag.
    Ex.: "<div></div>", "<section></section>", "<blockquote></blockquote>".
    Use o método match e faça o teste com a marcação abaixo:
    "<div><ul><li></li><li></li><li><span></span></li></ul></div>"
    O resultado deve ser:
    ["<li></li>", "<li></li>", "<span></span>"]
    */
    console.log( '\nMatch com tags HTML vazias (abertura e fechamento da tag):' );
    text = '<div><ul><li></li><li></li><li><span></span></li></ul></div>';
    regex = /(<\w+>)(<\/\w+>)/g;

    console.log(text.match(regex));

    /*
    Vamos complicar um pouco agora :D

    Crie uma expressão regular que faça o match com um texto existente dentro de
    uma tag HTML. O texto deve ser capturado e substituído por:
    'O texto dentro da tag "[NOME DA TAG]" é "[TEXTO]"'

    Use a marcação abaixo para fazer o replace:
    "<h1>Título da página</h1><p>Este é um parágrafo</p><footer>Rodapé</footer>"

    A marcação deve permanecer como está, somente o texto deve ser substituído.
    No replace, utilize quebras de linha para deixar uma tag por linha.

    O resultado deve ser esse:
    <h1>O texto dentro da tag "h1" é "Título da página"</h1>
    <p>O texto dentro da tag "p" é "Este é um parágrafo"</p>
    <footer>O texto dentro da tag "footer" é "Rodapé"</footer>

    Uma dica: faça o match aos poucos. Para facilitar o teste, use o site
    https://regex101.com/#javascript e verifique se as capturas estão
    corretas, para depois aplicar no código ;)
    */
    console.log( '\nFazer replace dos textos das tags:' );
    // .+ -> Seleciona tudo, exceto quebra de linha.

    text = '<h1>Título da página</h1><p>Este é um parágrafo</p><footer>Rodapé</footer>';
    regex = /<(\w+)>([^<]+)<\/\w+>/g;

    console.log(text.replace(regex, 'O texto dentro da tag "$1" é "$2" </$1>\n' ));
    // $1-> Substitui o primeiro grupo encontrado.

})();
