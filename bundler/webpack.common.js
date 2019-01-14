// Ajout des plugins après le telechargement
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // Permet de génerer les sourcesmap
    devtool: 'source-map',
    // Initialisation serveur dev webpack
    devServer: 
    {
        contentBase: './dist',
        open: true,
        hot: true
    },
    entry: './src/index.js',
    output:
    {
        // Ajout de [hash] dans le filename pour le cache breaker
        filename: 'bundle.[hash].js',
        // Librairie qui permet de générer les chemins pour tous les ordis
        path: path.resolve(__dirname, '../dist')
    },
    plugins:
    [
        // Plugin Static Files (Prend les fichiers dans static et les mets à disposition) --> ex Robot.txt
        new CopyWebpackPlugin([ { from: 'static' } ]),
        // Recreer le fichier html dans le dossier dist
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ],
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                // Sélectionne tous les fichiers qui se finissent par ces infos (Regex)
                test: /\.(jpg|png|svg|gif)$/,
                // Utilise le loader installé sur tous les fichiers séléctionnés
                use:
                [
                    {
                        loader: 'file-loader',
                        // Creer un dossier au lieu d'avoir l'image à la racine
                        options:
                        {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2|woff|otf|eot|ttf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:
                [
                    'html-loader'
                ]
            }
        ]
    }
}