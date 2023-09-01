import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';
import './styles.css';

export class TelaInicio{
  formPrincipal: HTMLFormElement;
  txtPesquisa: HTMLInputElement;
  btnLimpar: HTMLButtonElement;

  pnlConteudo: HTMLDivElement;

  private pokemonService: PokemonService;

  constructor(){
    this.pokemonService = new PokemonService();
    this.registrarElementos();
    this.registrarEventos();
  }

  registrarElementos(): void {
    this.formPrincipal = document.getElementById("formPrincipal") as HTMLFormElement;
    this.txtPesquisa = document.getElementById("txtPesquisa") as HTMLInputElement;
    this.btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
    this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
  }

  registrarEventos(): void{
    this.formPrincipal.addEventListener('submit', (sender) => this.buscar(sender));

    this.btnLimpar.addEventListener('click', () => this.limparCard());
  }

  buscar(sender: Event): void{
    sender.preventDefault();

    if(!this.txtPesquisa.value) return;

    const nome = this.txtPesquisa.value;
    this.txtPesquisa.value = '';

    this.limparCard();
    this.pesquisarPokemonPorNome(nome);
  }

  limparCard(): void{
    this.pnlConteudo.querySelector('.card-pokemon')
    ?.remove();
  }

  private pesquisarPokemonPorNome(nome: string){
    this.pokemonService.selecionarPokemonPorNome(nome)
    .then(poke => this.gerarCard(poke))
    .catch((erro: Error) => console.log(erro.message));
  }

  private gerarCard(pokemon: Pokemon): void{
    const lblId = document.createElement("p");
    const lblNome = document.createElement("p");
    const imgSprite = document.createElement("img");

    lblId.textContent = pokemon.id.toString();
    lblNome.textContent = pokemon.nome;
    imgSprite.src = pokemon.spriteUrl;

    const pnlPokemon = document.createElement('div');
    pnlPokemon.classList.add('card-pokemon');

    pnlPokemon.appendChild(lblId);
    pnlPokemon.appendChild(lblNome);
    pnlPokemon.appendChild(imgSprite);

    this.pnlConteudo.appendChild(pnlPokemon);
  }
}

window.addEventListener('load', () => new TelaInicio());