# Grey-naiss

## Présentation

Grey-naiss est un lorem ipsum dolor sit amet adipiscing elit quam, arium lor tatsi


## Organisation des branches

Chaque développeur travaille sur la branche correspondant à son rôle :

- `front` : développement frontend — branche de travail de Ben-kaïl.
- `back` : développement backend.
- `serveur` : configuration et développement serveur/infrastructure.

## Installation

Depuis votre terminal, faites :

```bash
git clone https://github.com/Ben20060714/grey-naiss.git
cd grey-naiss
npm install
npm run build
npm run dev
```

## Synchronisation des branches

Depuis la branche `front` :

```bash
git switch front
git fetch origin
git merge origin/main
git push origin front
```

Depuis la branche `back` :

```bash
git switch back
git fetch origin
git merge origin/main
git push origin back
```

Depuis la branche `serveur` :

```bash
git switch serveur
git fetch origin
git merge origin/main
git push origin serveur
```

Cette procédure permet de récupérer les dernières modifications de `main` et
de mettre à jour la branche frontend distante.

## Collaborateurs

- Aurelio — [@Havi6](https://github.com/Havi6)
- Djamel — [@djameldjiemel410-web](https://github.com/djameldjiemel410-web)
- Ben-kaïl — [@Ben20060714](https://github.com/Ben20060714)
